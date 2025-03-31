import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum Statuses {
    active = 'active',
    inactive = 'inactive',
}

@Schema({ timestamps: { createdAt:'created_at', updatedAt:'updated_at' } })
export class Payment {
    @Expose({ name: 'payment_id' })
    @Prop({ default: '' })
    _id: string;

    @Expose()
    @Prop({ required: true })
    @IsString()
    payment_code: string;

    @Expose()
    @Prop({ required: true })
    @IsString()
    name: string;

    @Expose()
    @Prop({ default: '' })
    @IsOptional()
    @IsString()
    description: string;

    @Expose()
    @Prop({ required: true, default: Statuses.active })
    @IsOptional()
    @IsEnum(Statuses)
    status: Statuses;

    constructor(init: Payment) {
        Object.assign(this, init);
    }
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
