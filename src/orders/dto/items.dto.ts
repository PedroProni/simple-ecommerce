import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ItemsDto {
  @Expose()
  @ApiProperty()
  @IsString()
  sku: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  unity_price: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  quantity: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  discount: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  total: number;
}
