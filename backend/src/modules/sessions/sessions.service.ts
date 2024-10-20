import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ISession } from './interfaces/ISession';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from './schemas/session.schema';
import { Model, Types } from 'mongoose';
import { CreateSessionServiceDto } from './dto/create-session-service.dto';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);
  sessions: ISession[] = [];

  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async create(data: CreateSessionServiceDto) {
    this.logger.log(`Creating new session`);
    const newSession = {
      ...data,
      creatorId: new Types.ObjectId(data.creatorId),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const createdSession = new this.sessionModel(newSession);
    const savedSession = await createdSession.save();

    this.logger.debug(`Session created: ${JSON.stringify(savedSession)}`);
    return savedSession;
  }

  ///////////////////////////////////////////////////
  /////            CRUD OPERATIONS              /////
  ///////////////////////////////////////////////////

  findAll() {
    this.logger.log('Retrieving all sessions');
    return this.sessionModel.find();
  }

  async findOne(id: string): Promise<Session | undefined> {
    try {
      const session = await this.sessionModel.findById(id).exec();
      return session;
    } catch (error) {
      this.logger.error(`[-] Error finding session with id: ${id}`, error);
      throw error;
    }
  }

  async remove(id: string) {
    this.logger.log(`[-] Removing session with id: ${id}`);
    try {
      await this.sessionModel.findByIdAndDelete(id);
    } catch (error) {
      this.logger.error(`[-] Error removing session with id: ${id}`, error);
      throw error;
    }

    this.logger.debug(`[-] Session with id ${id} removed`);
    return { message: `Session with id ${id} removed` };
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    this.logger.log(`[-] Updating session with id: ${id}`);

    const session = await this.sessionModel.findByIdAndUpdate(
      id,
      updateSessionDto,
    );

    this.logger.debug(`[-] Session updated: ${JSON.stringify(session)}`);
    return session;
  }

  async patch(id: string, updateSessionDto: UpdateSessionDto) {
    this.logger.log(`[-] Patching session with id: ${id}`);

    try {
      const session = await this.sessionModel.findByIdAndUpdate(
        id,
        { $set: updateSessionDto },
        { new: true, runValidators: true },
      );

      if (!session) {
        this.logger.warn(`[-] Session with id ${id} not found`);
        throw new NotFoundException(`Session with id ${id} not found`);
      }

      this.logger.debug(`[-] Session patched: ${JSON.stringify(session)}`);
      return session;
    } catch (error) {
      this.logger.error(`[-] Error patching session with id: ${id}`, error);
      throw error;
    }
  }

  generateUniqueCode(): string {
    this.logger.log('[-] Generating unique code');
    const code = Math.random().toString(36).substring(2, 15);
    this.logger.debug(`[-] Unique code generated: ${code}`);
    return code;
  }
}
