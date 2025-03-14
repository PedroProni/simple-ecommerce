import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsString } from "class-validator";
import { Statuses } from "../entities/product.entity";

export class CreateProductDto {
    @Expose()
    @ApiProperty()
    @IsString()
    sku: string;

    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsString()
    description: string;

    @Expose()
    @ApiProperty({ enum: Statuses, default: Statuses.active })
    @IsEnum(Statuses)
    status: Statuses;

    @Expose()
    @ApiProperty()
    @IsString()
    um: string;

    @Expose()
    @ApiProperty()
    price: number;

    @Expose()
    @ApiProperty()
    stock: number;
}
