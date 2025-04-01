import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { CustomerDto } from './customer.dto';
import { ItemsDto } from './items.dto';
import { Statuses } from '../entities/order.entity';
import { CreatePaymentDto } from 'src/payments/dto/create-payment.dto';

export class CreateOrderDto {
  @Expose()
  @ApiProperty()
  @IsString()
  increment_id: string;

  @Expose()
  @ApiProperty({ enum: Statuses, default: Statuses.pending })
  @IsEnum(Statuses)
  status: Statuses;

  @Expose()
  @ApiProperty({ type: [CustomerDto] })
  @ValidateNested({ each: true })
  @Type(() => CustomerDto)
  customer_info: CustomerDto[];

  @Expose()
  @ApiProperty({ type: [ItemsDto] })
  @ValidateNested({ each: true })
  @Type(() => ItemsDto)
  items: ItemsDto[];

  @Expose()
  @ApiProperty({ type: CreatePaymentDto })
  @ValidateNested()
  @Type(() => CreatePaymentDto)
  payment_info: CreatePaymentDto;

  @Expose()
  @ApiProperty()
  @IsNumber()
  installments: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  order_discount: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  order_total: number;

  @Expose()
  @ApiProperty()
  @IsString()
  order_observation: string;
}
