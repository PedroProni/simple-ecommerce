import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { Expose, Type } from 'class-transformer';
import { CustomerDto } from './customer.dto';
import { IsString, ValidateNested } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @Expose()
  @ApiProperty({ type: [CustomerDto] })
  @ValidateNested({ each: true })
  @Type(() => CustomerDto)
  customer_info: CustomerDto[];

  @Expose()
  @ApiProperty()
  @IsString()
  order_observation: string;
}
