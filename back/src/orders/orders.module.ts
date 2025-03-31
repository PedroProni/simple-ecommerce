import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { Stock, StockSchema } from 'src/stocks/entities/stock.entity';
import { Payment, PaymentSchema } from 'src/payments/entities/payment.entity';
import { Product, ProductSchema } from 'src/products/entities/product.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
      MongooseModule.forFeature([{ name: Stock.name, schema: StockSchema }]),
      MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
      MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
