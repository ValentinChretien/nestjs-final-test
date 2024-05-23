import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema'; // Import du schéma User


@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ type: 'ObjectId', ref: User.name, required: true })
  userId: string;

  @Prop({ required: true })
  priority: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
