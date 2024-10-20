import { ITab } from 'src/modules/tabs/interface/tab.interface';

export interface ISession {
  id: number;
  name: string;
  creatorId: number;
  code?: string;
  tab?: ITab;
  createdAt: Date;
  updatedAt: Date;
}
