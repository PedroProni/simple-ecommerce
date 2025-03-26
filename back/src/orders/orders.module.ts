import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { Stock, StockSchema } from 'src/stocks/entities/stock.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
    ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
