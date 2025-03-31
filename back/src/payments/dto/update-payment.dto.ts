import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreatePaymentDto } from './create-payment.dto';
import { Expose } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { Statuses } from '../entities/payment.entity';

export class UpdatePaymentDto extends PartialType(CreatePaymentDto) {
  @Expose()
  @ApiProperty()
  @IsString()
  payment_code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;

  @Expose()
  @ApiProperty()
  @IsEnum(Statuses)
  status: Statuses;
}
