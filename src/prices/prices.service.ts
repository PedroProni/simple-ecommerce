import { Injectable } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async create(createPriceDto: CreatePriceDto) {
    const createPrice = new this.priceModel(createPriceDto);
    const result = await createPrice.save();
    return new Price(result.toJSON());
  }

  async findAll() {
    return await this.priceModel.find().exec();
  }

  async findOne(id: string) {
    return await this.priceModel.findById(id).exec();
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    return await this.priceModel.updateOne({ _id: id}, updatePriceDto).exec();
  }

  async remove(id: string) {
    return await this.priceModel.deleteOne({ _id: id }).exec();
  }
}
