import { Injectable, Logger } from '@nestjs/common';
import { CreateOpenaiDto } from './dto/create-openai.dto';
import { UpdateOpenaiDto } from './dto/update-openai.dto';

@Injectable()
export class OpenaiService {
  private readonly logger = new Logger(OpenaiService.name);

  create(createOpenaiDto: CreateOpenaiDto) {
    this.logger.log('Creating new openai');
    return 'This action adds a new openai';
  }

  findAll() {
    this.logger.log('Retrieving all openai');
    return `This action returns all openai`;
  }

  findOne(id: number) {
    this.logger.log(`Finding openai with id: ${id}`);
    return `This action returns a #${id} openai`;
  }

  update(id: number, updateOpenaiDto: UpdateOpenaiDto) {
    this.logger.log(`Updating openai with id: ${id}`);
    return `This action updates a #${id} openai`;
  }

  remove(id: number) {
    this.logger.log(`Removing openai with id: ${id}`);
    return `This action removes a #${id} openai`;
  }
}
