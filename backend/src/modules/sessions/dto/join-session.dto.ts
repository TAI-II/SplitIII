import { IsNotEmpty, IsString, IsMongoId } from 'class-validator';
import { Transform } from 'class-transformer';
import { Types } from 'mongoose';

export class JoinSessionDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsMongoId()
  @Transform(({ value }) => {
    if (typeof value === 'number') {
      throw new Error('userId must be a valid MongoDB ObjectId string');
    }
    return value;
  })
  userId: Types.ObjectId;
}
