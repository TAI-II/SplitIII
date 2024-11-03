import { Types } from "mongoose";

export interface ISessionUser {
    userId: Types.ObjectId;
    name: string;
    isReady: boolean;
    selectedItems: {
      id: string;
      name: string;
      quantity: number;
    }[];
    joinedAt: Date;
  }