import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { SessionsService } from './sessions.service';
import { JoinSessionDto } from './dto/join-session.dto';
import { Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';

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

      const users = session.users || [];
      this.logger.log(`Current users in session ${sessionId}: ${JSON.stringify(users)}`);
      
      if (users.includes(userId)) {
        this.logger.warn(`User ${userId} is already in session ${sessionId}`);
        return { success: false, error: 'User already in session' };
      }
      
      await this.sessionService.patch(sessionId, { users: [...users, userId] });
      this.logger.log(`User ${userId} added to session ${sessionId}`);
      
      const updatedSession = await this.sessionService.findOne(sessionId);
      return { success: true, data: updatedSession.users };
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

      const users = session.users || [];
      this.logger.log(`Current users in session ${sessionId}: ${JSON.stringify(users)}`);
      
      if (!users.includes(userId)) {
        this.logger.warn(`User ${userId} is not in session ${sessionId}`);
        return { success: false, error: 'User not in session' };
      }
      
      await this.sessionService.patch(sessionId, { 
        users: users.filter(id => id !== userId) 
      });
      this.logger.log(`User ${userId} removed from session ${sessionId}`);
      
      const updatedSession = await this.sessionService.findOne(sessionId);
      return { success: true, data: updatedSession.users };
    } catch (error) {
      this.logger.error(`Error handling leaveSession for user ${userId} in session ${sessionId}`, error.stack);
      return { success: false, error: 'Internal server error' };
    }
  }
}

