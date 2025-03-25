import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = new this.orderModel(createOrderDto);
      const order = await createOrder.save();
      return instanceToPlain(new Order(order.toJSON()));
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException('Order already exists');
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

  remove(id: string) {
    try {
      return this.orderModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
