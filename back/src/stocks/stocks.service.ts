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

  // Methods for managing stocks

  async create(createStockDto: CreateStockDto) {
    try {
      const createStock = new this.stockModel(createStockDto);
      await this.verifyStock(createStock);
      const stock = await createStock.save();
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll(sku, updated_at, limit = 10, page = 1) {
    try {
      if (sku) {
        return await this.findBySKU(sku, limit, page);
      }
      if (updated_at) {
        return await this.findByUpdatedAt(updated_at, limit, page);
      }
      const stocks = await this.stockModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return stocks.map((stock) => instanceToPlain(new Stock(stock.toJSON())));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      const stock = await this.stockExists('_id', id);
      return instanceToPlain(new Stock(stock.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    try {
      await this.stockExists('_id', id);
      await this.stockModel.updateOne({ _id: id }, updateStockDto).exec();
      const updated_stock = await this.stockModel.findById(id).exec();
      return updated_stock;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      await this.stockExists('_id', id);
      return await this.stockModel.deleteOne({ _id: id }).exec();
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing stock-related logic

  async stockExists(key: string, value: string) {
    const stock = await this.stockModel.find({ [key]: value }).exec();
    if (!stock) {
      throw new NotFoundException('Stock not found');
    }
    return stock[0];
  }

  async verifyStock(stock: Stock) {
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

  async findBySKU(sku: string, limit = 10, page = 1) {
    try {
      const stocks = await this.stockModel
        .find({ sku })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return stocks.map((stock) => instanceToPlain(new Stock(stock.toJSON())));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findByUpdatedAt(updated_at: Date, limit = 10, page = 1) {
    try {
      const stocks = await this.stockModel
        .find({ updated_at: { $gt: updated_at } })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return stocks.map((stock) => instanceToPlain(new Stock(stock.toJSON())));
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Method for handling exceptions

  async handleException(e: any) {
    if (e.code === 11000 || e.response?.message === 'Stock already exists') {
      throw new ConflictException('Stock already exists');
    }
    if (e.response?.message === 'Stock not found') {
      throw new NotFoundException('Stock not found');
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
