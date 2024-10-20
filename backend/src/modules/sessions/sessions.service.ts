import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UpdateSessionDto } from './dto/update-session.dto';
import { ISession } from './interfaces/ISession';

@Injectable()
export class SessionsService {
  private readonly logger = new Logger(SessionsService.name);
  sessions: ISession[] = [];

  create(data: Partial<ISession>) {
    this.logger.log(`Creating new session`);
    const newSession = {
      id: this.sessions.length + 1,
      creatorId: data.creatorId,
      name: data.name,
      code: data.code,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.sessions.push(newSession);
    this.logger.debug(`Session created: ${JSON.stringify(newSession)}`);
    return newSession;
  }

  ///////////////////////////////////////////////////
  /////            CRUD OPERATIONS              /////
  ///////////////////////////////////////////////////

  findAll() {
    this.logger.log('Retrieving all sessions');
    return this.sessions;
  }

  findOne(id: number): ISession | undefined {
    this.logger.log(`[-] Finding session with id: ${id}`);
    const session = this.sessions.find((session) => session.id === id);
    if (!session) {
      this.logger.warn(`[-]Session with id ${id} not found`);
      throw new NotFoundException(`Session with id ${id} not found`);
    }
    this.logger.debug(`[-] Session found: ${JSON.stringify(session)}`);
    return session;
  }

  remove(id: number) {
    this.logger.log(`[-] Removing session with id: ${id}`);
    try {
      this.sessions = this.sessions.filter((session) => session.id !== id);
    } catch (error) {
      this.logger.error(`[-] Error removing session with id: ${id}`, error);
      throw error;
    }

    this.logger.debug(`[-] Session with id ${id} removed`);
    return { message: `Session with id ${id} removed` };
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    this.logger.log(`[-] Updating session with id: ${id}`);
    const session = this.findOne(id);
    if (!session) {
      this.logger.warn(`[-] Session with id ${id} not found for update`);
      return;
    }
    
    this.logger.debug(`[-] Session updated: ${JSON.stringify(session)}`);
    return session;
  }

  patch(id: number, updateSessionDto: UpdateSessionDto) {
    this.logger.log(`[-] Patching session with id: ${id}`);
    const session = this.findOne(id);
    if (!session) {
      this.logger.warn(`[-] Session with id ${id} not found for patch`);
      throw new NotFoundException(`Session with id ${id} not found`);
    }

    // Update only the fields that are present in updateSessionDto
    Object.keys(updateSessionDto).forEach((key) => {
      if (updateSessionDto[key] !== undefined) {
        session[key] = updateSessionDto[key];
      }
    });

    session.updatedAt = new Date();

    this.logger.debug(`[-] Session patched: ${JSON.stringify(session)}`);
    return session;
  }

  generateUniqueCode(): string {
    this.logger.log('[-] Generating unique code');
    const code = Math.random().toString(36).substring(2, 15);
    this.logger.debug(`[-] Unique code generated: ${code}`);
    return code;
  }
}
