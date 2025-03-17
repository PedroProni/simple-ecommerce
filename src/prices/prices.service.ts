import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async create(createPriceDto: CreatePriceDto) {
    const createPrice = new this.priceModel(createPriceDto);
    const result = await createPrice.save();
    return plainToInstance(Price, result.toJSON());
  }

  async findAll() {
    const prices = await this.priceModel.find().exec();
    return prices.map(price => plainToInstance(Price, price.toJSON()));
  }

  async findOne(id: string) {
    const price = await this.priceModel.findById(id).exec();
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    return plainToInstance(Price, price.toJSON());
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
        const updatedPrice = await this.priceModel.updateOne({ _id: id }, updatePriceDto).exec();
        if (!updatedPrice) {
          throw new NotFoundException('Price not found');
        }
        return plainToInstance(Price, updatedPrice);
  }

  async remove(id: string) {
    return await this.priceModel.deleteOne({ _id: id }).exec();
  }
}
