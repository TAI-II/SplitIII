import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  users: User[] = [];

  create(createUserDto: CreateUserDto) {
    this.users.push({
      id: this.users.length + 1,
      ...createUserDto,
    });
    return this.users[this.users.length - 1];
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.find((user) => user.id === id);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
