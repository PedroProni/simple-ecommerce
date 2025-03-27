import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { Stock } from 'src/stocks/entities/stock.entity';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = new this.orderModel(createOrderDto);
      const orderItems = createOrderDto.items;
      const orderExists = await this.orderModel
        .find({ increment_id: createOrder.increment_id })
        .exec();
      if (orderExists.length > 0) {
        throw new ConflictException('Order already exists');
      }
      await this.verifyStock(orderItems, createOrderDto);
      this.verifyPrice(createOrderDto);
      const order = await createOrder.save();
      return instanceToPlain(new Order(order.toJSON()));
    } catch (e) {
      if (e.code === 11000 || e.response.message === 'Order already exists') {
        throw new ConflictException('Order already exists');
      }
      if (e.errors) {
        const missingFields = Object.keys(e.errors);
        throw new BadRequestException(
          `Required fields are missing: ${missingFields.join(', ')}`,
        );
      }
      if (e.response.message === 'Not enough stock') {
        throw new ConflictException('Not enough stock');
      }
      if (e.response.message === 'Total price is incorrect') {
        throw new ConflictException('Order price is incorrect');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const orders = await this.orderModel.find().exec();
      return orders.map((order) => instanceToPlain(new Order(order.toJSON())));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return instanceToPlain(new Order(order.toJSON()));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const order = await this.orderModel
        .updateOne({ _id: id }, updateOrderDto)
        .exec();
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      return order;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      const order = await this.orderModel.findById(id).exec();
      if (!order) {
        throw new NotFoundException('Order not found');
      }
      if (updateOrderStatusDto.status === 'canceled' && order.status !== 'canceled' && order.status !== 'refunded') {
        console.log('TODO: Refund stock');
      }
      if (order.status === 'canceled' || order.status === 'refunded') {
        throw new ConflictException('Order is already canceled or refunded');
      }
      await this.orderModel.updateOne({ _id: id }, updateOrderStatusDto);
      const updated_order = await this.orderModel.findById(id).exec();
      return updated_order;
    } catch (e) {
      if (e.response.message === 'Order not found') {
        throw new NotFoundException('Order not found');
      }
      if (e.response.message === 'Order is already canceled or refunded') {
        throw new ConflictException('Order is already canceled or refunded');
      }
      if (e.errors) {
        const missingFields = Object.keys(e.errors);
        throw new BadRequestException(
          `Required fields are missing: ${missingFields.join(', ')}`,
        );
      }
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return this.orderModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async verifyStock(items, createOrderDto: CreateOrderDto) {
    for (const item of items) {
      const stocks = await this.stockModel
        .find({
          sku: item.sku,
          qty: { $gte: item.quantity },
          status: 'active',
        })
        .sort({ priority: 1 })
        .exec();
      if (stocks.length === 0) {
        throw new ConflictException('Not enough stock');
      }
      for (const stock of stocks) {
        let found_stock = false;
        if (stock.qty >= item.quantity) {
          stock.qty -= item.quantity;
          await stock.save();
          found_stock = true;
            await this.orderModel.updateOne(
            { increment_id: createOrderDto.increment_id },
            { $push: { stock_sources: { stock_id: stock._id, quantity: item.quantity } } }
            );
          break;
        }
        if (!found_stock) {
          throw new ConflictException('Not enough stock');
        }
      }
    }
  }

  verifyPrice(createOrderDto: CreateOrderDto) {
    const orderItems = createOrderDto.items;
    let total = 0;
    for (const item of orderItems) {
      total += item.unity_price * item.quantity - item.discount;
    }
    if (total !== createOrderDto.order_total) {
      throw new ConflictException('Total price is incorrect');
    }
  }
}
