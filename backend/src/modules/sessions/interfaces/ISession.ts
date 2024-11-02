import { Types } from 'mongoose';
import { ITab } from 'src/modules/tabs/interface/tab.interface';

export interface ISession {
  id: number;
  name: string;
  creatorId: number;
  code?: string;
  tab?: ITab;
  users?: Types.ObjectId[];
  userSelections?: { [key: string]: SelectedItem[] };
  readyUsers?: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectedItem {
  itemId: string;
  quantity: number;
}
