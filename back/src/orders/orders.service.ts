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

      await this.orderExists('increment_id', createOrderDto.increment_id);
      await this.verifyPayment(createOrderDto.payment_info.payment_code);
      if(createOrder.installments) {
        if(createOrder.installments < 1) {
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
      if (e.code === 11000 || e.response.message === 'Order already exists') {
        throw new ConflictException('Order already exists');
      };
      if (e.errors) {
        const missingFields = Object.keys(e.errors);
        throw new BadRequestException(
          `Required fields are missing: ${missingFields.join(', ')}`,
        );
      };
      if(e.response.message === 'Installments must be at least 1') {
        throw new BadRequestException('Installments must be at least 1');
      }
      if (e.response.message === 'Product not found') {
        throw new NotFoundException('Product not found');
      };
      if (e.response.message === 'Payment not found') {
        throw new NotFoundException('Payment not found');
      };
      if (e.response.message === 'Not enough stock') {
        throw new ConflictException('Not enough stock');
      };
      if (e.response.message === 'Total price is incorrect') {
        throw new ConflictException('Order price is incorrect');
      };
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
      const order = await this.orderExists("_id", id);
      return order;
    } catch (e) {
      if (e.response.message === 'Order not found') {
        throw new NotFoundException('Order not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    try {
      const [ customer_info, order_observation, ...rest ] = Object.keys(updateOrderDto);
      if (rest.length > 0) {
        throw new BadRequestException('Very long message');
      };

      await this.orderExists("_id", id);
      await this.orderModel.updateOne({ _id: id }, updateOrderDto).exec();

      const updated_order = await this.orderModel.findById(id).exec();
      return updated_order;     
    } catch (e) {
      if (e.response.message === 'Order not found') {
        throw new NotFoundException('Order not found');
      }
      if (e.response.message === 'Very long message') {
        throw new BadRequestException('The only fields that can be updated are customer_info and order_observation');
      }
      throw new InternalServerErrorException();
    }
  }

  async updateStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto) {
    try {
      const order = await this.orderExists("_id", id);
      if (updateOrderStatusDto.status === 'canceled' && order.status !== 'canceled' && order.status !== 'refunded') {
        await this.refundStock(order);
      };
      if (order.status === 'canceled' || order.status === 'refunded') {
        throw new ConflictException('Order is already canceled or refunded');
      };

      await this.orderModel.updateOne({ _id: id }, updateOrderStatusDto);

      const updated_order = await this.orderModel.findById(id).exec();
      return updated_order;
    } catch (e) {
      if (e.response.message === 'Order not found') {
        throw new NotFoundException('Order not found');
      };
      if (e.response.message === 'Order is already canceled or refunded') {
        throw new ConflictException('Order is already canceled or refunded');
      };
      if (e.errors) {
        const missingFields = Object.keys(e.errors);
        throw new BadRequestException(
          `Required fields are missing: ${missingFields.join(', ')}`,
        );
      };
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.orderModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
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
        throw new ConflictException('Not enough stock');
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

  async refundStock(order: Order) {
    for (const stock of order.stock_sources) {
      const stock_to_refund = await this.stockModel.findById(stock.stock_id).exec();
      if (stock_to_refund) {
        stock_to_refund.qty += stock.quantity;
        await stock_to_refund.save();
      } else {
        throw new NotFoundException(`Stock with ID ${stock.stock_id} not found`);
      }
    }
  }

  async verifyPayment(code: string) {
    const payment = await this.paymentModel.findOne({ payment_code: code }).exec();
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  async verifyProduct(sku: string) {
    const product = await this.productModel.findOne({ sku: sku }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }
}
