import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

@Schema({
  toJSON: { virtuals: true, versionKey: false },
  id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true, versionKey: false },
})
export class Customer {
  @Expose({ name: 'customer_id' })
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop({ required: true })
  email: string;

  @Expose()
  @Prop({ required: true })
  document: string;

  @Expose()
  @Prop({ required: true })
  phone: string;

  @Expose()
  @Prop({ required: true })
  street: string;

  @Expose()
  @Prop({ required: true })
  number: number;

  @Expose()
  @Prop({ required: true })
  complement: string;

  @Expose()
  @Prop({ required: true })
  neighborhood: string;

  @Expose()
  @Prop({ required: true })
  city: string;

  @Expose()
  @Prop({ required: true })
  postcode: string;

  constructor(init: Customer) {
    Object.assign(this, init);
  }
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
