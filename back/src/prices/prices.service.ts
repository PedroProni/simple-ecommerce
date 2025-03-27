import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  ConflictException,
  BadRequestException,
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


  // Methods for managing prices

  async create(createPriceDto: CreatePriceDto) {
    try {
      const createPrice = new this.priceModel(createPriceDto);

      const price_already_exists = await this.priceModel.find({sku: createPrice.sku, price_list_code: createPrice.price_list_code,}).exec();
      if (price_already_exists.length > 0) {
        throw new ConflictException('Price already exists');
      };

      const price = await createPrice.save();
      return instanceToPlain(new Price(price.toJSON()));
    } catch (e) {
      if (e.code === 11000 || e.response.message === 'Price already exists') {
        throw new ConflictException('Price already exists');
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

  async findAll() {
    try {
      const prices = await this.priceModel.find().exec();
      return prices.map((price) => instanceToPlain(new Price(price.toJSON())));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const price = await this.priceExists('_id', id);
      return instanceToPlain(new Price(price.toJSON()));
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Price not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    try {
      await this.priceExists('_id', id);
      await this.priceModel.updateOne({ _id: id }, updatePriceDto).exec();
      const updated_price = this.priceExists('_id', id);
      return updated_price;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Price not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const price = await this.priceExists('_id', id);
      await this.priceModel.deleteOne({ _id: id }).exec();
      return price;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Price not found');
      }
      throw new InternalServerErrorException();
    }
  }

  // Helper methods for processing and managing price-related logic

  async priceExists(key: string, value: string) {
    const price = await this.priceModel.find({ [key]: value }).exec();
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    return price[0];
  }
}
