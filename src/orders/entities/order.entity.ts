import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Customer } from './customer.entity';
import { Items } from './items.entity';

export enum Statuses {
  pending = 'pending',
  paid = 'paid',
  invoiced = 'invoiced',
  shipped = 'shipped',
  delivered = 'delivered',
  canceled = 'canceled',
  refunded = 'refunded',
}

@Schema({
  toJSON: { virtuals: true, versionKey: false },
  id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true, versionKey: false },
})
export class Order {
  @Expose({ name: 'order_id' })
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Expose()
  @Prop({ required: true, unique: true })
  increment_id: string;

  @Expose()
  @Prop({ required: true })
  status: Statuses;

  @Expose()
  @Type(() => Customer)
  customer_info: Customer;

  @Expose()
  @Type(() => Items)
  items: Items[];

  @Expose()
  @Prop({ required: true })
  order_discount: number;

  @Expose()
  @Prop({ required: true })
  order_total: number;

  constructor(init: Order) {
    Object.assign(this, init);
  }
}

export const OrderSchema = SchemaFactory.createForClass(Order);
