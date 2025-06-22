import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ITab } from 'src/modules/tabs/interface/tab.interface';

export class CreateSessionServiceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  creatorId: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsOptional()
  @IsObject()
  tab?: ITab;
}
