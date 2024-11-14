import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../users/user.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionsService } from './sessions.service';

@ApiTags('sessions')
@Controller('sessions')
export class SessionsController {
  private readonly logger = new Logger(SessionsController.name);

  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionsService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({
    status: 201,
    description: 'The session has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async create(@Body() createSessionDto: CreateSessionDto) {
    this.logger.log(
      `[-] Creating new session: ${JSON.stringify(createSessionDto)}`,
    );
    if (createSessionDto.userName) {
      const user = await this.userService.create({
        name: createSessionDto.userName,
      });
      createSessionDto.creatorId = user._id.toString();
    }

    const sessionCode = this.sessionService.generateUniqueCode();
    return this.sessionService.create({
      name: createSessionDto.name,
      creatorId: createSessionDto.creatorId,
      code: sessionCode,
      tab: createSessionDto.tab,
    });
  }

  ///////////////////////////////////////////////////
  /////            CRUD OPERATIONS              /////
  ///////////////////////////////////////////////////

  @Get('')
  @ApiOperation({ summary: 'Retrieve all sessions' })
  @ApiResponse({
    status: 200,
    description: 'The sessions have been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAll() {
    this.logger.log('[-] Retrieving all sessions');
    return this.sessionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a session by id' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully retrieved.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findOne(@Param('id') id: string) {
    this.logger.log(`[-] Retrieving session with id: ${id}`);
    return this.sessionService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a session by id' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully removed.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  remove(@Param('id') id: string) {
    this.logger.log(`[-] Removing session with id: ${id}`);
    return this.sessionService.remove(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a session by id' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  updateCode(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    this.logger.log(
      `[-] Updating session with id: ${id}: ${JSON.stringify(updateSessionDto)}`,
    );
    return this.sessionService.update(id, updateSessionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a session by id' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    this.logger.log(
      `Patching session with id: ${id}: ${JSON.stringify(updateSessionDto)}`,
    );
    return this.sessionService.patch(id, updateSessionDto);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Retrieve a session by code' })
  @ApiResponse({
    status: 200,
    description: 'The session has been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Session not found.' })
  getByCode(@Param('code') code: string) {
    this.logger.log(`[-] Retrieving session with code: ${code}`);
    return this.sessionService.getSessionByCode(code);
  }
}
