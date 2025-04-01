import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<Payment>,
  ) {}

  // Methods for managing payments

  async create(createPaymentDto: CreatePaymentDto) {
    try {
      const createPayment = new this.paymentModel(createPaymentDto);
      const payment_already_exists = await this.paymentModel.find({
        payment_code: createPayment.payment_code,
      });
      if (payment_already_exists.length > 0) {
        throw new ConflictException('Payment already exists');
      }
      const payment = await createPayment.save();
      return instanceToPlain(new Payment(payment.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll() {
    try {
      const payments = await this.paymentModel.find().exec();
      return payments.map((payment) =>
        instanceToPlain(new Payment(payment.toJSON())),
      );
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      return await this.paymentExists('_id', id);
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      await this.paymentExists('_id', id);
      await this.paymentModel.updateOne({ _id: id }, updatePaymentDto);
      const updated_payment = await this.paymentModel.findById(id);
      return updated_payment;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      const payment = await this.paymentExists('_id', id);
      await this.paymentModel.deleteOne({ _id: payment._id });
      return payment;
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing payment-related logic

  async paymentExists(key: string, value: string) {
    const payment = await this.paymentModel.findOne({ [key]: value });
    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    return payment;
  }

  // Method for handling exceptions

  async handleException(e) {
    if (e.response.message === 'Payment not found') {
      throw new NotFoundException('Payment not found');
    }
    if (e.response.message === 'Payment already exists') {
      throw new ConflictException('Payment already exists');
    }
    throw new InternalServerErrorException();
  }
}
