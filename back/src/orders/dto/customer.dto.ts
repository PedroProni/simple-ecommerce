import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class CustomerDto {
  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  document: string;

  @Expose()
  @ApiProperty()
  @IsString()
  phone: string;

  @Expose()
  @ApiProperty()
  @IsString()
  street: string;

  @Expose()
  @ApiProperty()
  @IsNumber()
  number: number;

  @Expose()
  @ApiProperty()
  @IsString()
  complement: string;

  @Expose()
  @ApiProperty()
  @IsString()
  neighborhood: string;

  @Expose()
  @ApiProperty()
  @IsString()
  city: string;

  @Expose()
  @ApiProperty()
  @IsString()
  postcode: string;
}
