import { Test, TestingModule } from '@nestjs/testing';
import { SessionsGateway } from './sessions.gateway';
import { SessionsService } from './sessions.service';
import { UserService } from '../users/user.service';
import { Logger } from '@nestjs/common';
import { Types } from 'mongoose';

describe('SessionsGateway', () => {
  let gateway: SessionsGateway;
  let sessionsService: SessionsService;
  let userService: UserService;

  const mockUser = {
    _id: new Types.ObjectId(),
    name: 'Test User',
  };

  const mockSession = {
    _id: new Types.ObjectId(),
    name: 'Test Session',
    sessionUsers: [],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsGateway,
        {
          provide: SessionsService,
          useValue: {
            findOne: jest.fn(),
            patch: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOne: jest.fn(),
            isValidObjectId: jest.fn(),
          },
        },
      ],
    }).compile();

    gateway = module.get<SessionsGateway>(SessionsGateway);
    sessionsService = module.get<SessionsService>(SessionsService);
    userService = module.get<UserService>(UserService);
  });

  describe('handleJoinSession', () => {
    it('should successfully add a user to a session', async () => {
      const userId = mockUser._id;
      const sessionId = mockSession._id.toString();

      jest.spyOn(userService, 'isValidObjectId').mockReturnValue(true);
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as any);
      jest.spyOn(sessionsService, 'findOne').mockResolvedValue(mockSession as any);
      jest.spyOn(sessionsService, 'patch').mockResolvedValue({
        ...mockSession,
        sessionUsers: [{
          userId,
          name: mockUser.name,
          isReady: false,
          selectedItems: [],
          joinedAt: expect.any(Date)
        }]
      } as any);

      const result = await gateway.handleJoinSession({ sessionId, userId });

      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(sessionsService.patch).toHaveBeenCalledWith(sessionId, {
        sessionUsers: [{
          userId,
          name: mockUser.name,
          isReady: false,
          selectedItems: [],
          joinedAt: expect.any(Date)
        }]
      });
    });

    it('should return error when userId is invalid', async () => {
      const userId: any = 'invalid-id';
      const sessionId = mockSession._id.toString();

      jest.spyOn(userService, 'isValidObjectId').mockReturnValue(false);

      const result = await gateway.handleJoinSession({ sessionId, userId });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid userId format');
      expect(sessionsService.patch).not.toHaveBeenCalled();
    });

    it('should return error when user is not found', async () => {
      const userId = mockUser._id;
      const sessionId = mockSession._id.toString();

      jest.spyOn(userService, 'isValidObjectId').mockReturnValue(true);
      jest.spyOn(userService, 'findOne').mockResolvedValue(null);

      const result = await gateway.handleJoinSession({ sessionId, userId });

      expect(result.success).toBe(false);
      expect(result.error).toBe('User not found');
      expect(sessionsService.patch).not.toHaveBeenCalled();
    });

    it('should return error when session is not found', async () => {
      const userId = mockUser._id;
      const sessionId = mockSession._id.toString();

      jest.spyOn(userService, 'isValidObjectId').mockReturnValue(true);
      jest.spyOn(userService, 'findOne').mockResolvedValue(mockUser as any);
      jest.spyOn(sessionsService, 'findOne').mockResolvedValue(null);

      const result = await gateway.handleJoinSession({ sessionId, userId });

      expect(result.success).toBe(false);
      expect(result.error).toBe('Session not found');
      expect(sessionsService.patch).not.toHaveBeenCalled();
    });
  });
});
