import { Expose } from 'class-transformer';
import { UserRole } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

export class CreateUserDto {
  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsEmail()
  email: string;

  @Expose()
  @ApiProperty()
  @IsString()
  password: string;

  @Expose()
  @ApiProperty({ enum: UserRole, default: UserRole.USER })
  @IsEnum(UserRole)
  role: UserRole;
}
