import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Schema()
export class User {
  @Expose({ name: 'user_id' })
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Expose()
  @Prop()
  role: UserRole;

  constructor(init: User) {
    Object.assign(this, init);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
