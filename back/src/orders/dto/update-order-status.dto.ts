import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Statuses } from '../entities/order.entity';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
    @Expose()
    @ApiProperty({ enum: Statuses })
    @IsEnum(Statuses)
    status: Statuses;
}
