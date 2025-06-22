import { IsArray, IsMongoId, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';

class SelectedItem {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}

export class ReadySessionDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsMongoId()
  userId: Types.ObjectId;

  @IsArray()
  @IsNotEmpty()
  selectedItems: SelectedItem[];
}
