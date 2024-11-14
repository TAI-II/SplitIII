import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SessionCodeDocument = HydratedDocument<SessionCode>;

@Schema()
export class SessionCode {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ type: Types.ObjectId, ref: 'Session', required: true })
  sessionId: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const SessionCodeSchema = SchemaFactory.createForClass(SessionCode);
