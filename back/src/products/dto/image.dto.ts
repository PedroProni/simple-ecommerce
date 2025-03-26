import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ImageDto {
    @Expose()
    @ApiProperty()
    @IsString()
    url: string;

    @Expose()
    @ApiProperty()
    @IsNumber()
    position: number;

    @Expose()
    @ApiProperty({ default: false })
    @IsBoolean()
    main_image: boolean;
}
