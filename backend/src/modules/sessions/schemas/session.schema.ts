import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { ISessionUser } from '../interfaces/ISessionUser';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  creatorId: Types.ObjectId;

  @Prop({ required: false })
  code: string;

  @Prop({ type: Object })
  tab: {
    total: number;
    serviceFee: number;
    items: { id: string; name: string; totalAmount: number; pricePerUnit: number }[];
  };

  @Prop({ type: [Object], default: [] })
  sessionUsers: ISessionUser[];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);