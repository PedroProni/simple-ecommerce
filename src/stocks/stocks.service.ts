import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StocksService {
  constructor(@InjectModel(Stock.name) private stockModel: Model<Stock>) {}

  async create(createStockDto: CreateStockDto) {
    const createStock = new this.stockModel(createStockDto);
    const result = await createStock.save();
    return new Stock(result.toJSON());
  }

  async findAll() {
    return await this.stockModel.find().exec();
  }

  async findOne(id: string) {
    return await this.stockModel.findById(id).exec();
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    return await this.stockModel.updateOne({ _id: id }, updateStockDto).exec();
  }

  remove(id: string) {
    return this.stockModel.deleteOne({ _id: id }).exec();
  }
}
