import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { CustomerDto } from './customer.dto';
import { IsString, ValidateNested } from 'class-validator';

export class UpdateOrderDto {
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
