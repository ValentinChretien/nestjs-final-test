import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../user/user.schema'; // Import du schéma User


@Schema()
export class Task extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  priority: number;

  toJSON() {
    const { _id, __v, ...task } = this.toObject(); // Exclude _id and __v from the serialized object
    return { id: _id, ...task }; // Rename _id to id
  }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
