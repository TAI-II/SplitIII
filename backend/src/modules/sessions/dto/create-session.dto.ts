import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSessionDto {
  @ApiProperty({ description: 'The name of the session' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The name of the user creating the session' })
  @IsNotEmpty()
  @IsString()
  userName: string;
}
