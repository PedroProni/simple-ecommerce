import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

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
}
