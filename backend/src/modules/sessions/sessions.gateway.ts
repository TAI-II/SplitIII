import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionsService } from './sessions.service';
import { JoinSessionDto } from './dto/join-session.dto';
import { Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { ReadySessionDto } from './dto/ready-session.dto';
import { ISessionUser } from './interfaces/ISessionUser';

@WebSocketGateway()
export class SessionsGateway {
  private readonly logger = new Logger(SessionsGateway.name);

  constructor(
    private readonly sessionService: SessionsService,
    private readonly userService: UserService,
  ) {}

  @SubscribeMessage('joinSession')
  async handleJoinSession(@MessageBody() joinSessionDto: JoinSessionDto) {
    const { sessionId, userId } = joinSessionDto;
    this.logger.log(`User ${userId} is attempting to join session ${sessionId}`);

    try {
      if (!this.userService.isValidObjectId(userId)) {
        this.logger.warn(`Invalid userId format: ${userId}`);
        return { success: false, error: 'Invalid userId format' };
      }

      // Verify if user exists
      const user = await this.userService.findOne(userId);
      if (!user) {
        this.logger.warn(`User with id ${userId} not found`);
        return { success: false, error: 'User not found' };
      }

      const session = await this.sessionService.findOne(sessionId);
      if (!session) {
        this.logger.warn(`Session with id ${sessionId} not found`);
        return { success: false, error: 'Session not found' };
      }

      const sessionUsers = session.sessionUsers || [];
      const existingUser = sessionUsers.find(su => su.userId.toString() === userId.toString());
      
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

      await this.sessionService.patch(sessionId, {
        sessionUsers: [...sessionUsers, newSessionUser]
      });

      const updatedSession = await this.sessionService.findOne(sessionId);
      return { success: true, data: updatedSession.sessionUsers };
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
      if (!this.userService.isValidObjectId(userId)) {
        this.logger.warn(`Invalid userId format: ${userId}`);
        return { success: false, error: 'Invalid userId format' };
      }

      // Verify if user exists
      const user = await this.userService.findOne(userId);
      if (!user) {
        this.logger.warn(`User with id ${userId} not found`);
        return { success: false, error: 'User not found' };
      }

      const session = await this.sessionService.findOne(sessionId);
      if (!session) {
        this.logger.warn(`Session with id ${sessionId} not found`);
        return { success: false, error: 'Session not found' };
      }

      const sessionUsers = session.sessionUsers || [];
      this.logger.log(`Current users in session ${sessionId}: ${JSON.stringify(sessionUsers)}`);
      
      if (!sessionUsers.some(su => su.userId.toString() === userId.toString())) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }
      
      await this.sessionService.patch(sessionId, { 
        sessionUsers: sessionUsers.filter(su => su.userId.toString() !== userId.toString()) 
      });
      this.logger.log(`User ${userId} removed from session ${sessionId}`);
      
      const updatedSession = await this.sessionService.findOne(sessionId);
      return { success: true, data: updatedSession.sessionUsers };
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
      if (!this.userService.isValidObjectId(userId)) {
        this.logger.warn(`Invalid userId format: ${userId}`);
        return { success: false, error: 'Invalid userId format' };
      }

      const session = await this.sessionService.findOne(sessionId);
      if (!session) {
        this.logger.warn(`Session with id ${sessionId} not found`);
        return { success: false, error: 'Session not found' };
      }

      const sessionUsers = session.sessionUsers || [];
      const userIndex = sessionUsers.findIndex(su => su.userId.toString() === userId.toString());

      if (userIndex === -1) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }

      sessionUsers[userIndex] = {
        ...sessionUsers[userIndex],
        isReady: true,
        selectedItems: selectedItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity
        }))
      };

      await this.sessionService.patch(sessionId, { sessionUsers });

      const updatedSession = await this.sessionService.findOne(sessionId);
      return { 
        success: true, 
        data: updatedSession.sessionUsers 
      };
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
      if (!this.userService.isValidObjectId(userId)) {
        this.logger.warn(`Invalid userId format: ${userId}`);
        return { success: false, error: 'Invalid userId format' };
      }

      const session = await this.sessionService.findOne(sessionId);
      if (!session) {
        this.logger.warn(`Session with id ${sessionId} not found`);
        return { success: false, error: 'Session not found' };
      }

      const sessionUsers = session.sessionUsers || [];
      const userIndex = sessionUsers.findIndex(su => su.userId.toString() === userId.toString());

      if (userIndex === -1) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }

      sessionUsers[userIndex] = {
        ...sessionUsers[userIndex],
        isReady: false,
        selectedItems: []
      };

      await this.sessionService.patch(sessionId, { sessionUsers });

      const updatedSession = await this.sessionService.findOne(sessionId);
      return { 
        success: true, 
        data: updatedSession.sessionUsers 
      };
    } catch (error) {
      this.logger.error(`Error handling unready state for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }
}

