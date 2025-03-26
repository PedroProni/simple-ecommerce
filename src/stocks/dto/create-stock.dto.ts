import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsEnum, IsNumber, IsString } from "class-validator";
import { Statuses } from "../entities/stock.entity";

export class CreateStockDto {
    @Expose()
    @ApiProperty()
    @IsString()
    sku: string;

    @Expose()
    @ApiProperty()
    @IsString()
    warehouse: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    qty: number;

    @Expose()
    @ApiProperty()
    @IsNumber()
    priority: number;

    @Expose()
    @ApiProperty()
    @IsEnum(Statuses)
    status: Statuses;
}
