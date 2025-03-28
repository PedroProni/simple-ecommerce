import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsOptional, IsString } from "class-validator";


export class CreateCategoryDto {
    @Expose()
    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    parent_category_code?: string;

    @Expose()
    @ApiProperty()
    @IsString()
    category_code: string;

    @Expose()
    @ApiProperty()
    @IsString()
    name: string;

    @Expose()
    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;
}
