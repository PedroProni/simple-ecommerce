import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";

export enum Statuses {
    active = 'active',
    inactive = 'inactive',
}

@Schema({ versionKey: false , timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Stock {
    @Expose({ name: 'stock_id' })
    @Prop({ default: () => new Types.ObjectId(), unique: true })
    _id: string;
    
    @Expose()
    @Prop({ required: true })
    sku: string;
     
    @Expose()
    @Prop({ required: true })
    warehouse: string;

    @Expose()
    @Prop({ required: true })
    qty: number;

    @Expose()
    @Prop({ required: true })
    priority: number;

    @Expose()
    @Prop({ required: true, enum: Object.values(Statuses) })
    status: Statuses;

    constructor(init: Stock) {
        Object.assign(this, init);
    }
}

export const StockSchema = SchemaFactory.createForClass(Stock);
