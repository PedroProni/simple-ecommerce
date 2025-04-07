import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class UpdateUserDto {
  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsOptional()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
