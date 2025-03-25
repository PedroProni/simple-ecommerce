import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PricesModule } from './prices/prices.module';
import { StocksModule } from './stocks/stocks.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI || 'mongodb://localhost:27017/simplenest'),
    UsersModule, 
    ProductsModule, 
    PricesModule, 
    StocksModule, 
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
