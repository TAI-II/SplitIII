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
import { OpenaiService } from '../openai/openai.service';
import { TabsService } from '../tabs/tabs.service';
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
    private readonly openaiService: OpenaiService,
    private readonly tabsService: TabsService,
  ) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new session' })
  @ApiResponse({ status: 201, description: 'The session has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body() createSessionDto: CreateSessionDto) {
    this.logger.log(
      `[-] Creating new session: ${JSON.stringify(createSessionDto)}`,
    );
    const user = this.userService.create({
      name: createSessionDto.userName,
    });
    const sessionCode = this.sessionService.generateUniqueCode();
    return this.sessionService.create({
      ...createSessionDto,
      creatorId: user.id,
      code: sessionCode,
    });
  }

  ///////////////////////////////////////////////////
  /////            CRUD OPERATIONS              /////
  ///////////////////////////////////////////////////

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
  updateCode(
    @Param('id') id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    this.logger.log(
      `[-] Updating session with id: ${id}: ${JSON.stringify(updateSessionDto)}`,
    );
    return this.sessionService.update(+id, updateSessionDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateSessionDto: UpdateSessionDto) {
    this.logger.log(
      `Patching session with id: ${id}: ${JSON.stringify(updateSessionDto)}`,
    );
    return this.sessionService.patch(+id, updateSessionDto);
  }
}
