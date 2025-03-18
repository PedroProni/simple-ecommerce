import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";

@Schema({ versionKey: false , timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } })
export class Price {
    @Expose()
    @Prop({ default: () => new Types.ObjectId(), unique: true })
    _id: string;
    
    @Expose()
    @Prop({ required: true })
    sku: string;
    
    @Expose()
    @Prop({ required: true })
    price_list_code: string;
    
    @Expose()
    @Prop({ required: true })
    price: number;
    
    constructor(init: Price) {
        Object.assign(this, init);
    }
}

export const PriceSchema = SchemaFactory.createForClass(Price);
