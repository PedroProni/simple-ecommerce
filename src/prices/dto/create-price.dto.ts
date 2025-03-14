import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreatePriceDto {
    @Expose()
    @ApiProperty()
    @IsString()
    sku: string;

    @Expose()
    @ApiProperty()
    price_list_code: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    price: number;
}
