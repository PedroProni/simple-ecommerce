import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { Types } from "mongoose";
import { Stock } from "src/stocks/entities/stock.entity";
import { Price } from "src/prices/entities/price.entity";

export enum Statuses {
    active = 'active',
    inactive = 'inactive',
}

@Schema({ toJSON: { virtuals: true, versionKey: false}, id: false,  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, toObject: { virtuals: true, versionKey: false } })
export class Product {

    @Expose()
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
    price: Price[];

    @Expose()
    stock: Stock[];

    constructor(init: Product) {
        Object.assign(this, init);
    }
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('stocks', {
    ref: 'Stock', // Nome do modelo referenciado
    localField: 'sku', // Campo no Product
    foreignField: 'sku', // Campo no Stock
    justOne: false, // Como um produto pode ter vários estoques, definimos como false
});

ProductSchema.virtual('prices', {
    ref: 'Price', // Nome do modelo referenciado
    localField: 'sku', // Campo no Product
    foreignField: 'sku', // Campo no Price
    justOne: false, // Como um produto pode ter vários preços, definimos como false
});

