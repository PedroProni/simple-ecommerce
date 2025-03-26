import { PartialType } from '@nestjs/mapped-types';
import { CreatePriceDto } from './create-price.dto';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdatePriceDto extends PartialType(CreatePriceDto) {
  @Expose()
  @ApiProperty()
  @IsString()
  sku: string;

  @Expose()
  @ApiProperty()
  @IsString()
  price_list_code: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  price: number;
}
