import { ApiProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";
import { IsEnum, IsOptional, IsString, ValidateNested } from "class-validator";
import { Statuses } from "../entities/product.entity";
import { ImageDto } from "./image.dto"

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
    @IsOptional()
    @IsString()
    description?: string;

    @Expose()
    @ApiProperty({ enum: Statuses, default: Statuses.active })
    @IsEnum(Statuses)
    status: Statuses;

    @Expose()
    @ApiProperty()
    @IsString()
    main_category: string;

    @Expose()
    @ApiProperty()
    @IsString()
    um: string;

    @Expose()
    @ApiProperty()
    @IsOptional()
    @IsString()
    brand: string;

    @Expose()
    @ApiProperty({ type: [ImageDto] })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ImageDto)
    images: ImageDto[];
}
