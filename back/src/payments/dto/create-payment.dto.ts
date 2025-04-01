import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { Statuses } from "../entities/payment.entity";

export class CreatePaymentDto {
    @Expose()
    @ApiProperty()
    @IsString()
    payment_code: string;

    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    @IsString()
    description: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    @IsEnum(Statuses)
    status: Statuses;
}
