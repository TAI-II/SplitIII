import { Types } from 'mongoose';
import { ISessionUser } from './ISessionUser';
import { ITab } from '../../tabs/interface/tab.interface';
import { IBillCalculation } from 'src/modules/bills/interfaces/IBillCalculation';
export interface ISession {
  id: number;
  name: string;
  creatorId: Types.ObjectId;
  code?: string;
  tab?: ITab;
  users?: Types.ObjectId[];
  userSelections?: { [key: string]: SelectedItem[] };
  readyUsers?: Types.ObjectId[];
  sessionUsers?: ISessionUser[];
  createdAt: Date;
  updatedAt: Date;
}

export interface SelectedItem {
  itemId: string;
  quantity: number;
}
