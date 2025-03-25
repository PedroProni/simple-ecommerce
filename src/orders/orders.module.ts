import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order, OrderSchema } from './entities/order.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
      MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
