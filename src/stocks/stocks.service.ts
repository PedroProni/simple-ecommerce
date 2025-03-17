import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async create(createStockDto: CreateStockDto) {
    const createStock = new this.stockModel(createStockDto);
    const result = await createStock.save();
    return plainToInstance(Stock, result.toJSON());
  }

  async findAll() {
    const stocks = await this.stockModel.find().exec();
    return stocks.map(stock => plainToInstance(Stock, stock.toJSON()));
  }

  async findOne(id: string) {
    const stock = await this.stockModel.findById(id).exec();
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }
    return plainToInstance(Stock, stock.toJSON());
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    await this.stockModel.updateOne({ _id: id }, updateStockDto).exec();
    const updatedStock = await this.stockModel.findById(id).exec();
    if (!updatedStock) {
      throw new NotFoundException('Stock not found');
    }
    return plainToInstance(Stock, updatedStock.toJSON());
  }

  remove(id: string) {
    return this.stockModel.deleteOne({ _id: id }).exec();
  }
}
