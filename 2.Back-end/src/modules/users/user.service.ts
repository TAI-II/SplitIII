import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: Types.ObjectId) {
    return this.userModel.findById(id);
  }

  update(id: Types.ObjectId) {
    return this.userModel.findByIdAndUpdate(id, { new: true });
  }

  remove(id: Types.ObjectId) {
    return this.userModel.findByIdAndDelete(id);
  }

  isValidObjectId(id: any): boolean {
    try {
      if (typeof id !== 'string') {
        return false;
      }
      return id.match(/^[0-9a-fA-F]{24}$/) !== null;
    } catch (e) {
      return false;
    }
  }
}
