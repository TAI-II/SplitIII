import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('')
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`[-] Creating new user: ${JSON.stringify(createUserDto)}`);
    return this.userService.create(createUserDto);
  }

  @Get('')
  findAll() {
    this.logger.log('[-] Retrieving all users');
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`[-] Retrieving user with id: ${id}`);
    return this.userService.findOne(+id);
  }
}
