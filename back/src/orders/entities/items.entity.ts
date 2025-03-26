import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { Types } from 'mongoose';

@Schema({
  toJSON: { virtuals: true, versionKey: false },
  id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true, versionKey: false },
})
export class Items {
  @Expose({ name: 'items_id' })
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Expose()
  @Prop({ required: true })
  sku: string;

  @Expose()
  @Prop({ required: true })
  name: string;

  @Expose()
  @Prop({ required: true })
  unity_price: number;

  @Expose()
  @Prop({ required: true })
  quantity: number;

  @Expose()
  @Prop({ required: true })
  discount: number;

  @Expose()
  @Prop({ required: true })
  total: number;

  constructor(init: Items) {
    Object.assign(this, init);
  }
}

export const ItemsSchema = SchemaFactory.createForClass(Items);
