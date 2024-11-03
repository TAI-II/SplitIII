import { IsNotEmpty, IsString } from 'class-validator';

export class LinkTabToSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  tab: ITab;
}
