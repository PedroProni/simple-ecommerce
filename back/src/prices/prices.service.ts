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

      const price_already_exists = await this.priceModel
        .find({
          sku: createPrice.sku,
          price_list_code: createPrice.price_list_code,
        })
        .exec();
      if (price_already_exists.length > 0) {
        throw new ConflictException('Price already exists');
      }
      if (createPrice.price < 0) {
        throw new BadRequestException('Price cannot be negative');
      }

      const price = await createPrice.save();
      return instanceToPlain(new Price(price.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll() {
    try {
      const prices = await this.priceModel.find().exec();
      return prices.map((price) => instanceToPlain(new Price(price.toJSON())));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      const price = await this.priceExists('_id', id);
      return instanceToPlain(new Price(price.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updatePriceDto: UpdatePriceDto) {
    try {
      await this.priceExists('_id', id);
      if (updatePriceDto.price < 0) {
        throw new BadRequestException('Price cannot be negative');
      }
      await this.priceModel.updateOne({ _id: id }, updatePriceDto).exec();
      const updated_price = this.priceExists('_id', id);
      return updated_price;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      const price = await this.priceExists('_id', id);
      await this.priceModel.deleteOne({ _id: id }).exec();
      return price;
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing price-related logic

  async priceExists(key: string, value: string) {
    const price = await this.priceModel.findOne({ [key]: value }).exec();
    if (!price) {
      throw new NotFoundException('Price not found');
    }
    return price;
  }

  // Method for handling exceptions

  async handleException(e) {
    if (e.response.message === 'Price cannot be negative') {
      throw new BadRequestException('Price cannot be negative');
    }
    if (e.response.message === 'Price already exists') {
      throw new ConflictException('Price already exists');
    }
    if (e.response.message === 'Price not found') {
      throw new NotFoundException('Price not found');
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
