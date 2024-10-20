import { IsNotEmpty, IsString } from 'class-validator';

export class ProcessTabDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsString()
  @IsNotEmpty()
  sessionId: string;
}
