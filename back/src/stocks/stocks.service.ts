import {
  BadRequestException,
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
      await this.verifyStock(createStock);
      const stock = await createStock.save();
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      if (e.code === 11000 || e.response?.message === 'Stock already exists') {
        throw new ConflictException('Stock already exists');
      }
      if (e.response?.message === 'Stock quantity must be greater than 0') {
        throw new ConflictException('Stock quantity must be greater than 0');
      }
      if (e.response?.message === 'Stock priority already exists') {
        throw new ConflictException('Stock priority already exists');
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
      if (e.response?.message === 'Stock not found') {
        throw new NotFoundException('Stock not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    try {
      const stock = await this.stockModel.findById(id).exec();
      if (!stock) {
        throw new NotFoundException('Stock not found');
      }
      await this.stockModel.updateOne({ _id: id }, updateStockDto).exec();
      const updated_stock = await this.stockModel.findById(id).exec();
      return updated_stock;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Stock not found');
      }
      if (e.response?.message === 'Stock quantity must be greater than 0') {
        throw new ConflictException('Stock quantity must be greater than 0');
      }
      if (e.response?.message === 'Stock priority already exists') {
        throw new ConflictException('Stock priority already exists');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      return await this.stockModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async verifyStock(stock) {
    if (stock.qty < 0) {
      throw new BadRequestException('Stock quantity must be greater than 0');
    }
    const stocks = await this.stockModel.find({ sku: stock.sku }).exec();
    const already_exists = stocks.filter(
      (s) => s.warehouse === stock.warehouse,
    );
    if (already_exists.length > 0) {
      throw new ConflictException('Stock already exists');
    }
    stocks.forEach((s) => {
      if (s.priority === stock.priority) {
        throw new ConflictException('Stock priority already exists');
      }
    });
  }
}
