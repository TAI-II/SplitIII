import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'The user has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })  
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`[-] Creating new user: ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Retrieve all users' })
  @ApiResponse({ status: 200, description: 'The users have been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findAll() {
    this.logger.log('[-] Retrieving all users');
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a user by id' })
  @ApiResponse({ status: 200, description: 'The user has been successfully retrieved.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  findOne(@Param('id') id: string) {
    this.logger.log(`[-] Retrieving user with id: ${id}`);
    return this.userService.findOne(id);
  }
}
