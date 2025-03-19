import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Price } from './entities/price.entity';

@Injectable()
export class PricesService {
  constructor(@InjectModel(Price.name) private priceModel: Model<Price>) {}

  async create(createPriceDto: CreatePriceDto) {
    try {
      const createPrice = new this.priceModel(createPriceDto);
      const price = await createPrice.save();
      return instanceToPlain(new Price(price.toJSON()));
    } catch (e) {
      if (e.code === 11000) {
        throw new NotFoundException('Price already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const prices = await this.priceModel.find().exec();
      return prices.map((price) => instanceToPlain(new Price(price.toJSON())));
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const price = await this.priceModel.findById(id).exec();
      if (!price) {
        throw new NotFoundException('Price not found');
      }
      return instanceToPlain(new Price(price.toJSON()));
    } catch(e) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    try {
      const price = await this.priceModel
        .updateOne({ _id: id }, updatePriceDto)
        .exec();
      if (!price) {
        throw new NotFoundException('Product not found');
      }
      return price;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.priceModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
