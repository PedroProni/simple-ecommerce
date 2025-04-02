import { Controller, Get, Post, Delete, Put, Body, Param, Query } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  findAll(@Query('sku') sku?: string, @Query('updated_at') updated_at?: Date, @Query('limit') limit?:number, @Query('page') page?:number) {
    return this.pricesService.findAll(sku, updated_at, limit, page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pricesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePriceDto: UpdatePriceDto) {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(id);
  }
}
