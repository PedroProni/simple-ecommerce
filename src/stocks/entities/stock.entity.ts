import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";

@Schema()
export class Stock {
    @Expose({ name: 'stock_id' })
    @Prop({ default: () => new Types.ObjectId() })
    _id: string;
    
    @Expose()
    @Prop({ required: true, unique: true })
    sku: string;
     
    @Expose()
    @Prop({ required: true })
    warehouse: string;

    @Expose()
    @Prop({ required: true })
    qty: number;

    constructor(init: Stock) {
        Object.assign(this, init);
    }
}

export const StockSchema = SchemaFactory.createForClass(Stock);
