import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { Stock } from 'src/stocks/entities/stock.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Stock.name) private stockModel: Model<Stock>,
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Methods for managing orders

  async create(createOrderDto: CreateOrderDto) {
    try {
      const createOrder = new this.orderModel(createOrderDto);
      const orderItems = createOrderDto.items;

      const order_already_exists = await this.orderModel
        .findOne({ increment_id: createOrder.increment_id })
        .exec();
      if (order_already_exists) {
        throw new ConflictException('Order already exists');
      }
      await this.verifyPayment(createOrderDto.payment_info.payment_code);
      if (createOrder.installments) {
        if (createOrder.installments < 1) {
          throw new BadRequestException('Installments must be at least 1');
        }
      }
      for (const item of orderItems) {
        await this.verifyProduct(item.sku);
      }
      await this.verifyStock(orderItems, createOrder);
      this.verifyPrice(createOrderDto);

      const order = await createOrder.save();

      return instanceToPlain(new Order(order.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll(increment_id, updated_at, limit = 10, page = 1) {
    try {
      if (increment_id) {
        return await this.findByIncrementId(increment_id, limit, page);
      }
      if (updated_at) {
        return await this.findByUpdatedAt(updated_at, limit, page);
      }
      const orders = await this.orderModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updated_at: -1 })
      .exec();
      return orders.map((order) => instanceToPlain(new Order(order.toJSON())));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      const order = await this.orderExists('_id', id);
      return order;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const [customer_info, order_observation, ...rest] =
        Object.keys(updateOrderDto);
      if (rest.length > 0) {
        throw new BadRequestException('Very long message');
      }

      await this.orderExists('_id', id);
      await this.orderModel.updateOne({ _id: id }, updateOrderDto).exec();

      const updated_order = await this.orderModel.findById(id).exec();
      return updated_order;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      const order = await this.orderExists('_id', id);
      if (
        updateOrderStatusDto.status === 'canceled' &&
        order.status !== 'canceled' &&
        order.status !== 'refunded'
      ) {
        await this.refundStock(order);
      }
      if (order.status === 'canceled' || order.status === 'refunded') {
        throw new ConflictException('Order is already canceled or refunded');
      }

      await this.orderModel.updateOne({ _id: id }, updateOrderStatusDto);

      const updated_order = await this.orderModel.findById(id).exec();
      return updated_order;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      return await this.orderModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing order-related logic

  async orderExists(key: string, value: string): Promise<Order> {
    const order = await this.orderModel.findOne({ [key]: value }).exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async verifyStock(items: any, order: Order) {
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
        throw new ConflictException('Not enough stock', item.sku);
      }
      for (const stock of stocks) {
        let found_stock = false;
        if (stock.qty >= item.quantity) {
          stock.qty -= item.quantity;
          await stock.save();
          found_stock = true;
          order.stock_sources.push({
            stock_id: stock._id,
            quantity: item.quantity,
          });
          break;
        }
        if (!found_stock) {
          throw new ConflictException('Not enough stock', item.sku);
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

  async refundStock(order: Order) {
    for (const stock of order.stock_sources) {
      const stock_to_refund = await this.stockModel
        .findById(stock.stock_id)
        .exec();
      if (stock_to_refund) {
        stock_to_refund.qty += stock.quantity;
        await stock_to_refund.save();
      } else {
        throw new NotFoundException(
          `Stock with ID ${stock.stock_id} not found`,
        );
      }
    }
  }

  async verifyPayment(code: string) {
    const payment = await this.paymentModel
      .findOne({ payment_code: code })
      .exec();
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    if (payment.status !== 'active') {
      throw new ConflictException('Payment is not active');
    }
    return payment;
  }

  async verifyProduct(sku: string) {
    const product = await this.productModel.findOne({ sku: sku }).exec();
    if (!product) {
      throw new NotFoundException('Product not found', sku);
    }
    return product;
  }

  async findByIncrementId(increment_id: string, limit = 10, page = 1) {
    const order = await this.orderModel
      .findOne({ increment_id: increment_id })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updated_at: -1 })
      .exec();
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async findByUpdatedAt(updated_at: Date, limit = 10, page = 1) {
    const orders = await this.orderModel
      .find({ updated_at: { $gt: updated_at } })
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ updated_at: -1 })
      .exec();
    if (orders.length === 0) {
      throw new NotFoundException('Order not found');
    }
    return orders;
  }

  // Method for handling exceptions

  async handleException(e: any) {
    if (e.code === 11000 || e.response?.message === 'Order already exists') {
      throw new ConflictException('Order already exists');
    }
    if (e.response.message === 'Installments must be at least 1') {
      throw new BadRequestException('Installments must be at least 1');
    }
    if (e.response.message === 'Product not found') {
      throw new NotFoundException(`Product: ${e.response.error} not found`);
    }
    if (e.response?.message === 'Order not found') {
      throw new NotFoundException('Order not found');
    }
    if (e.response?.message === 'Not enough stock') {
      throw new ConflictException(`Product: ${e.response.error} doesn't have enough stock`);
    }
    if (e.response?.message === 'Total price is incorrect') {
      throw new ConflictException('Order price is incorrect');
    }
    if (e.response?.message === 'Order is already canceled or refunded') {
      throw new ConflictException('Order is already canceled or refunded');
    }
    if (e.response?.message === 'Payment not found') {
      throw new NotFoundException('Payment not found');
    }
    if (e.response?.message === 'Payment is not active') {
      throw new ConflictException('Payment is not active');
    }
    if (e.response?.message === 'Very long message') {
      throw new BadRequestException(
        'The only fields that can be updated are customer_info and order_observation',
      );
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
