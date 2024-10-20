import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ITab } from 'src/modules/tabs/interface/tab.interface';

export class CreateSessionDto {
  @ApiProperty({ description: 'The name of the session' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The name of the user creating the session' })
  @IsNotEmpty()
  @IsString()
  userName: string;

  @ApiProperty({ description: 'The code of the session' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'The tab of the session' })
  @IsOptional()
  @IsObject()
  tab?: ITab;
}
