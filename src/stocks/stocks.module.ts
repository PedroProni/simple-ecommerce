import { Module } from '@nestjs/common';
import { StocksService } from './stocks.service';
import { StocksController } from './stocks.controller';
import { Stock, StockSchema } from './entities/stock.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
  ],
  controllers: [StocksController],
  providers: [StocksService],
})
export class StocksModule {}
