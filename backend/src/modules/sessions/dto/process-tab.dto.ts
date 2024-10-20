import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProcessTabDto {
  @IsString()
  @IsNotEmpty()
  image: string;

  @IsNumber()
  @IsNotEmpty()
  sessionId: number;
}
