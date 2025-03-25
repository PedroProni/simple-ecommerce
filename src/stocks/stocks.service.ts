import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Model } from 'mongoose';
import { instanceToPlain } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async create(createStockDto: CreateStockDto) {
    try {
      const createStock = new this.stockModel(createStockDto);
      const stock_already_exists = await this.stockModel.find({ sku: createStock.sku, warehouse: createStock.warehouse }).exec();
      if (stock_already_exists.length > 0) {
        throw new ConflictException('Stock already exists');
      }
      const stock = await createStock.save();
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      if (e.code === 11000 || e.response.message === 'Stock already exists') {
        throw new ConflictException('Stock already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const stocks = await this.stockModel.find().exec();
      return stocks.map((stock) => instanceToPlain(new Stock(stock.toJSON())));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async findOne(id: string) {
    try {
      const stock = await this.stockModel.findById(id).exec();
      if (!stock) {
        throw new NotFoundException('Stock not found');
      }
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    try {
      await this.stockModel.updateOne({ _id: id }, updateStockDto).exec();
      const stock = await this.stockModel.findById(id).exec();
      if (!stock) {
        throw new NotFoundException('Stock not found');
      }
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  remove(id: string) {
    try {
      return this.stockModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }
}
