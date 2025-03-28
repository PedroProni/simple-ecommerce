import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @Expose()
  @ApiProperty()
  @IsString()
  parent_category_code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  category_code: string;

  @Expose()
  @ApiProperty()
  @IsString()
  name: string;

  @Expose()
  @ApiProperty()
  @IsString()
  description: string;
}
