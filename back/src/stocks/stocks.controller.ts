import { Controller, Get, Post, Delete, Put, Body, Param, Query } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';

@Controller('stocks')
export class StocksController {
  constructor(private readonly stocksService: StocksService) {}

  @Post()
  create(@Body() createStockDto: CreateStockDto) {
    return this.stocksService.create(createStockDto);
  }

  @Get()
  findAll(@Query('sku') sku?: string, @Query('updated_at') updated_at?: Date) {
    return this.stocksService.findAll(sku, updated_at);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stocksService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    return this.stocksService.update(id, updateStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stocksService.remove(id);
  }
}
