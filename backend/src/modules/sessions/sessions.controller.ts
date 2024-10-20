import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Logger } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SessionsService } from './sessions.service';
import { UserService } from '../users/user.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionsService,
  ) {}

  @Post('')
  create(@Body() createSessionDto: CreateSessionDto) {
    this.logger.log(`[-] Creating new session: ${JSON.stringify(createSessionDto)}`);
    const user = this.userService.create({
      name: createSessionDto.userName,
    });
    const sessionCode = this.sessionService.generateUniqueCode();
    return this.sessionService.create(user.id, sessionCode);
  }

  @Get('')
  findAll() {
    this.logger.log('[-] Retrieving all sessions');
    return this.sessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    this.logger.log(`[-] Retrieving session with id: ${id}`);
    return this.sessionService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.logger.log(`[-] Removing session with id: ${id}`);
    return this.sessionService.remove(+id);
  }

  @Put(':id')
  updateCode(@Param('id') id: number, @Body() updateSessionDto: UpdateSessionDto) {
    this.logger.log(`[-] Updating session with id: ${id}: ${JSON.stringify(updateSessionDto)}`);
    return this.sessionService.update(+id, updateSessionDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSessionDto: UpdateSessionDto) {
    this.logger.log(`Patching session with id: ${id}: ${JSON.stringify(updateSessionDto)}`);
    return this.sessionService.patch(+id, updateSessionDto);
  }
}
