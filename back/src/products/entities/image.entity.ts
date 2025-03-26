import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, } from 'class-transformer';
import { Types } from 'mongoose';

@Schema({
  toJSON: { virtuals: true, versionKey: false },
  id: false,
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  toObject: { virtuals: true, versionKey: false },
})
export class Image {
  @Expose({ name: 'image_id' })
  @Prop({ default: () => new Types.ObjectId() })
  _id: string;

  @Expose()
  @Prop({ required: true })
  sku: string;

  @Expose()
  @Prop({ required: true })
  url: string;

  @Expose()
  @Prop({ required: true })
  position: number;

  @Expose()
  @Prop({ required: true, default: false })
  main_image: boolean;

  constructor(init: Image) {
    Object.assign(this, init);
  }
}

export const ImageSchema = SchemaFactory.createForClass(Image);
