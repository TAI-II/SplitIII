import { IsArray, IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ITab } from 'src/modules/tabs/interface/tab.interface';
import { Types } from 'mongoose';
import { SelectedItem } from '../interfaces/ISession';
import { ISessionUser } from '../interfaces/ISessionUser';

export class CreateSessionDto {
  @ApiProperty({ description: 'The name of the session' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'The name of the user creating the session' })
  @IsOptional()
  @IsString()
  userName?: string;

  @ApiProperty({ description: 'The id of the user creating the session' })
  @IsOptional()
  @IsString()
  creatorId?: string;

  @ApiProperty({ description: 'The code of the session' })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'The tab of the session' })
  @IsOptional()
  @IsObject()
  tab?: ITab;

  @ApiProperty({ description: 'The users of the session' })
  @IsOptional()
  @IsArray()
  sessionUsers?: ISessionUser[];

  @ApiProperty({ description: 'The user selections of the session' })
  @IsOptional()
  @IsObject()
  userSelections?: { [key: string]: SelectedItem[] };

  @ApiProperty({ description: 'The ready users of the session' })
  @IsOptional()
  @IsArray()
  readyUsers?: Types.ObjectId[];
}
