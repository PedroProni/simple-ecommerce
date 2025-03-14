import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";

export enum Statuses {
    active = 'active',
    inactive = 'inactive',
}

@Schema()
export class Product {
    @Expose({ name: 'product_id' })
    @Prop({ default: () => new Types.ObjectId() })
    _id: string;
    
    @Expose()
    @Prop({ required: true, unique: true })
    sku: string;

    @Expose()
    @Prop({ required: true })
    name: string;
     
    @Expose()
    @Prop({ required: true })
    description: string;

    @Expose()
    @Prop({ required: true })
    status: Statuses;
    
    @Expose()
    @Prop({})
    um: string;

    @Expose()
    @Prop({})
    price: number;

    @Expose()
    @Prop({})
    stock: number;

    constructor(init: Product) {
        Object.assign(this, init);
    }
}

export const ProductSchema = SchemaFactory.createForClass(Product);
