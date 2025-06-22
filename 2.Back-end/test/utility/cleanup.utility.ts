import { Types } from 'mongoose';
import { SessionsService } from '../../src/modules/sessions/sessions.service';
import { UserService } from '../../src/modules/users/user.service';

export class CleanupUtility {
  private static sessionIds: string[] = [];
  private static userIds: string[] = [];

  static trackSessionId(id: string) {
    this.sessionIds.push(id);
  }

  static trackUserId(id: string) {
    this.userIds.push(id);
  }

  static async cleanup(
    sessionsService: SessionsService,
    userService: UserService,
  ) {
    // Clean up sessions
    for (const sessionId of this.sessionIds) {
      try {
        await sessionsService.remove(sessionId);
        console.log(`Cleaned up session: ${sessionId}`);
      } catch (error) {
        console.error(`Failed to clean up session ${sessionId}:`, error);
      }
    }

    // Clean up users
    for (const userId of this.userIds) {
      try {
        await userService.remove(new Types.ObjectId(userId));
        console.log(`Cleaned up user: ${userId}`);
      } catch (error) {
        console.error(`Failed to clean up user ${userId}:`, error);
      }
    }

    // Reset the arrays
    this.sessionIds = [];
    this.userIds = [];
  }
} 