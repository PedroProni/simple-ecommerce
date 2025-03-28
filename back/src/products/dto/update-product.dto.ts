import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { Statuses } from '../entities/product.entity';
import { ImageDto } from './image.dto';

export class UpdateProductDto extends PartialType(CreateProductDto) {
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
  @IsString()
  brand: string;

  @Expose()
  @ApiProperty({ type: [ImageDto] })
  @ValidateNested({ each: true })
  @Type(() => ImageDto)
  images: ImageDto[];
}
