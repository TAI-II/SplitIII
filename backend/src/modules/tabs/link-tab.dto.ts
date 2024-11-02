import { IsNotEmpty, IsString } from "class-validator";
import { ITab } from "./interface/tab.interface";

export class LinkTabToSessionDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNotEmpty()
  tab: ITab;
}
