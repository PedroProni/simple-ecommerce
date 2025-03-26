import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEnum, IsString, ValidateNested } from "class-validator";
import { Statuses } from "../entities/product.entity";
import { ImageDto } from "../dto/image.dto"

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
    @IsString()
    brand: string;

    @Expose()
    @ApiProperty({ type: [ImageDto] })
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];
}
