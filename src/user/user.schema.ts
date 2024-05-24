import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  toJSON() {
    const { _id, __v, ...user } = this.toObject(); // Exclude _id and __v from the serialized object
    return { id: _id, ...user }; // Rename _id to id
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
