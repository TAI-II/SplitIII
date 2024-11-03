import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { SessionsService } from './sessions.service';
import { JoinSessionDto } from './dto/join-session.dto';
import { Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ReadySessionDto } from './dto/ready-session.dto';
import { ISessionUser } from './interfaces/ISessionUser';
import { Server, Socket } from 'socket.io';
import { BillCalculatorService } from '../bills/bills.service';

@WebSocketGateway()
export class SessionsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  private readonly logger = new Logger(SessionsGateway.name);

  private activeSessionsMap: Map<string, {
    users: ISessionUser[];
    lastUpdated: Date;
  }> = new Map();

  private socketToSession: Map<string, { userId: string, sessionId: string }> = new Map();

  constructor(
    private readonly sessionService: SessionsService,
    private readonly userService: UserService,
    private readonly billCalculatorService: BillCalculatorService,
  ) {
    // Sync to database every minute
    setInterval(() => this.syncActiveSessions(), 60000);
  }

  private async syncActiveSessions() {
    this.logger.log('[-] Syncing active sessions...');
    for (const [sessionId, sessionData] of this.activeSessionsMap) {
      try {
        await this.sessionService.patch(sessionId, {
          sessionUsers: sessionData.users
        });
      } catch (error) {
        this.logger.error(`Failed to sync session ${sessionId}`, error);
      }
    }
  }

  private async getOrLoadSession(sessionId: string): Promise<{
    users: ISessionUser[];
    lastUpdated: Date;
  }> {
    let sessionData = this.activeSessionsMap.get(sessionId);
    
    if (!sessionData) {
      const session = await this.sessionService.findOne(sessionId);
      sessionData = {
        users: session.sessionUsers || [],
        lastUpdated: new Date()
      };
      this.activeSessionsMap.set(sessionId, sessionData);
    }

    return sessionData;
  }

  async handleDisconnect(client: Socket) {
    console.log('[-] Disconnecting user...');
    const userSession = this.socketToSession.get(client.id);
    if (!userSession) return;

    const { userId, sessionId } = userSession;
    this.logger.log(`User ${userId} disconnected from session ${sessionId}`);

    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      sessionData.users = sessionData.users.filter(su => su.userId.toString() !== userId.toString());
      sessionData.lastUpdated = new Date();

      // Clean up the socket mapping
      this.socketToSession.delete(client.id);

      // Notify other users about the disconnection
      this.server.emit(`session:${sessionId}:userDisconnected`, {
        userId,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      });
    } catch (error) {
      this.logger.error(`Error handling disconnect for user ${userId}`, error.stack);
    }
  }

  @SubscribeMessage('getSessionState')
  async handleGetSessionState(@MessageBody() { sessionId }: { sessionId: string }) {
    const sessionData = await this.getOrLoadSession(sessionId);
    
    return {
      success: true,
      data: {
        users: sessionData.users,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      }
    };
  }

  @SubscribeMessage('joinSession')
  async handleJoinSession(@MessageBody() joinSessionDto: JoinSessionDto, @ConnectedSocket() client: Socket) {
    const { sessionId, userId } = joinSessionDto;
    this.logger.log(`User ${userId} is attempting to join session ${sessionId}`);

    try {
      if (!this.userService.isValidObjectId(userId)) {
        this.logger.warn(`Invalid userId format: ${userId}`);
        return { success: false, error: 'Invalid userId format' };
      }

      const user = await this.userService.findOne(userId);
      if (!user) {
        this.logger.warn(`User with id ${userId} not found`);
        return { success: false, error: 'User not found' };
      }

      const sessionData = await this.getOrLoadSession(sessionId);
      const existingUser = sessionData.users.find(su => su.userId.toString() === userId.toString());
      
      if (existingUser) {
        this.logger.warn(`User ${userId} is already in session ${sessionId}`);
        return { success: false, error: 'User already in session' };
      }

      const newSessionUser: ISessionUser = {
        userId,
        name: user.name,
        isReady: false,
        selectedItems: [],
        joinedAt: new Date()
      };

      sessionData.users.push(newSessionUser);
      sessionData.lastUpdated = new Date();

      // Store socket mapping
      this.socketToSession.set(client.id, { userId: userId.toString(), sessionId });

      // Notify other users
      this.server.emit(`session:${sessionId}:userJoined`, {
        user: newSessionUser,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      });

      return { success: true, data: sessionData.users };
    } catch (error) {
      this.logger.error(`Error handling joinSession for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }

  @SubscribeMessage('leaveSession')
  async handleLeaveSession(@MessageBody() joinSessionDto: JoinSessionDto) {
    const { sessionId, userId } = joinSessionDto;
    this.logger.log(`User ${userId} is attempting to leave session ${sessionId}`);

    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      
      if (!sessionData.users.some(su => su.userId.toString() === userId.toString())) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }

      sessionData.users = sessionData.users.filter(su => su.userId.toString() !== userId.toString());
      sessionData.lastUpdated = new Date();

      // Notify other users
      this.server.emit(`session:${sessionId}:userLeft`, {
        userId,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      });

      return { success: true, data: sessionData.users };
    } catch (error) {
      this.logger.error(`Error handling leaveSession for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }

  @SubscribeMessage('ready')
  async handleReady(@MessageBody() readySessionDto: ReadySessionDto) {
    const { sessionId, userId, selectedItems } = readySessionDto;
    this.logger.log(`User ${userId} is marking as ready in session ${sessionId}`);

    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      const userIndex = sessionData.users.findIndex(su => su.userId.toString() === userId.toString());

      if (userIndex === -1) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }

      sessionData.users[userIndex] = {
        ...sessionData.users[userIndex],
        isReady: true,
        selectedItems: selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        }))
      };
      sessionData.lastUpdated = new Date();

      this.server.emit(`session:${sessionId}:readyUpdate`, {
        userId,
        isReady: true,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      });

      return { success: true, data: sessionData.users };
    } catch (error) {
      this.logger.error(`Error handling ready state for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }

  @SubscribeMessage('unready')
  async handleUnready(@MessageBody() readySessionDto: ReadySessionDto) {
    const { sessionId, userId } = readySessionDto;
    this.logger.log(`User ${userId} is marking as unready in session ${sessionId}`);

    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      const userIndex = sessionData.users.findIndex(su => su.userId.toString() === userId.toString());

      if (userIndex === -1) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }

      sessionData.users[userIndex] = {
        ...sessionData.users[userIndex],
        isReady: false,
        selectedItems: []
      };
      sessionData.lastUpdated = new Date();

      this.server.emit(`session:${sessionId}:readyUpdate`, {
        userId,
        isReady: false,
        totalUsers: sessionData.users.length,
        readyUsers: sessionData.users.filter(user => user.isReady).length
      });

      return { success: true, data: sessionData.users };
    } catch (error) {
      this.logger.error(`Error handling unready state for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }

  @SubscribeMessage('checkAllUsersReady')
  async handleCheckAllUsersReady(@MessageBody() joinSessionDto: JoinSessionDto) {
    const { sessionId } = joinSessionDto;
    
    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      const allUsersReady = sessionData.users.length > 0 && 
                           sessionData.users.every(user => user.isReady);
      
      // If all users are ready, automatically calculate the bill
      if (allUsersReady) {
        const session = await this.sessionService.findOne(sessionId);
        const billCalculation = this.billCalculatorService.calculateBill({
          tab: session.tab,
          sessionUsers: sessionData.users,
        });

        this.server.emit(`session:${sessionId}:billCalculated`, {
          success: true,
          data: billCalculation,
        });
      }

      return { 
        success: true, 
        data: {
          allUsersReady,
          totalUsers: sessionData.users.length,
          readyUsers: sessionData.users.filter(user => user.isReady).length,
          users: sessionData.users.map(user => ({
            name: user.name,
            isReady: user.isReady
          }))
        }
      };
    } catch (error) {
      this.logger.error(`Error checking ready state for session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }

  @SubscribeMessage('calculateBill')
  async handleCalculateBill(@MessageBody() { sessionId }: { sessionId: string }) {
    this.logger.log(`Calculating bill for session ${sessionId}`);

    try {
      const sessionData = await this.getOrLoadSession(sessionId);
      const session = await this.sessionService.findOne(sessionId); // We need the full session with tab data

      const billCalculation = this.billCalculatorService.calculateBill({
        ...session,
        sessionUsers: sessionData.users,
      });

      // Emit the bill calculation to all users in the session
      this.server.emit(`session:${sessionId}:billCalculated`, {
        success: true,
        data: billCalculation,
      });

      return { success: true, data: billCalculation };
    } catch (error) {
      this.logger.error(`Error calculating bill for session ${sessionId}`, error.stack);
      return { success: false, error: 'Failed to calculate bill' };
    }
  }
}

