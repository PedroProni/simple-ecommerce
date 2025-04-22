import {
  Injectable,
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model, SortOrder } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { Product } from './entities/product.entity';
import { Price } from 'src/prices/entities/price.entity';
import { Stock } from 'src/stocks/entities/stock.entity';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  // Methods for managing products

  async create(createProductDto: CreateProductDto) {
    try {
      const product_already_exists = await this.productModel
        .findOne({ sku: createProductDto.sku })
        .exec();
      if (product_already_exists) {
        throw new ConflictException('Product already exists');
      }
      await this.categoryExists(createProductDto.main_category);
      const createProduct = new this.productModel(createProductDto);
      const product = await createProduct.save();
      return instanceToPlain(new Product(product.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll(sku, updated_at, main_category, limit = 10, page = 1, sort = 'updated_at: -1') {
    try {
      if (limit > 100) {
        throw new BadRequestException('Limit cannot be greater than 100');
      }
      if (page < 1) {
        throw new BadRequestException('Page cannot be less than 1');
      }
      this.verifySort(sort);
      if (main_category) {
        return await this.findByCategoryCode(main_category, limit, page, sort);
      };
      if (sku) {
        return await this.findBySKU(sku, limit, page, sort);
      };
      if (updated_at) {
        return await this.findByUpdatedAt(updated_at, limit, page, sort);
      };
      const sort_obj = this.mountSort(sort);
      const products = await this.productModel
        .find()
        .populate('stocks')
        .populate('prices')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort_obj)
        .exec();
      return products.map((product) => {
        const json_product = product.toJSON();
        json_product.prices = json_product.prices.map(
          (price) => new Price(price),
        );
        json_product.stocks = json_product.stocks.map(
          (stock) => new Stock(stock),
        );
        return instanceToPlain(new Product(json_product));
      });
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.productModel
        .findById(id)
        .populate('stocks')
        .populate('prices')
        .exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return instanceToPlain(new Product(product.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productExists('_id', id);
      await this.productModel.updateOne({ _id: id }, updateProductDto).exec();
      const updated_product = await this.productModel.findById(id).exec();
      return updated_product;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      const product = this.productExists('_id', id);
      await this.productModel.deleteOne({ _id: id }).exec();
      return product;
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing product-related logic

  async productExists(key: string, value: string) {
    const product = await this.productModel.findOne({ [key]: value }).exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async categoryExists(code: string) {
    const category = await this.categoryModel
      .findOne({ category_code: code })
      .exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findBySKU(sku: string, limit: number, page: number, sort: string) {
    try {
      const sort_obj = this.mountSort(sort);
      const product = await this.productModel
        .findOne({ sku: sku })
        .populate('stocks')
        .populate('prices')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort_obj)
        .exec();
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return instanceToPlain(new Product(product.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findByUpdatedAt(updated_at: Date, limit: number, page: number, sort: string) {
    try {
      const sort_obj = this.mountSort(sort);
      const products = await this.productModel
        .find({ updated_at: { $gt: updated_at } })
        .populate('stocks')
        .populate('prices')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort_obj)
        .exec();
      return products.map((product) => {
        const json_product = product.toJSON();
        json_product.prices = json_product.prices.map(
          (price) => new Price(price),
        );
        json_product.stocks = json_product.stocks.map(
          (stock) => new Stock(stock),
        );
        return instanceToPlain(new Product(json_product));
      });
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findByCategoryCode(category_code: string, limit: number, page: number, sort: string) {
    try {
      const sort_obj = this.mountSort(sort);
      const products = await this.productModel
        .find({ main_category: category_code })
        .populate('stocks')
        .populate('prices')
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort_obj)
        .exec();
      if (products.length === 0) {
        throw new NotFoundException('Product not found');
      }
      return products.map((product) => {
        const json_product = product.toJSON();
        json_product.prices = json_product.prices.map(
          (price) => new Price(price),
        );
        json_product.stocks = json_product.stocks.map(
          (stock) => new Stock(stock),
        );
        return instanceToPlain(new Product(json_product));
      });
    } catch (e) {
      await this.handleException(e);
    }
  }

  mountSort(sort: string) {
    const [key, value] = sort.split(':');
    const obj = { [key.trim()]: parseInt(value.trim()) } as {[x in string]: SortOrder};
    return obj;
  }

  verifySort(sort: string) {

    const [key, value, ...rest] = sort.split(':');

    if (!key || !value) {
      throw new BadRequestException('Sort must be in the format key:value');
    }
    if (rest.length > 0) {
      throw new BadRequestException('Sort must be in the format key:value');
    }
    if (value.trim() !== '1' && value.trim() !== '-1') {
      throw new BadRequestException('Invalid sort value - must be 1 or -1');
    }
  }

  // Method for handling exceptions

  async handleException(e: any) {
    if (e.response?.message === 'Product not found') {
      throw new NotFoundException('Product not found');
    }
    if (e.response?.message === 'Category not found') {
      throw new ConflictException('Category not found');
    }
    if (e.response?.message === 'Product already exists' || e.code === 11000) {
      throw new ConflictException('Product already exists');
    }
    if (e.response?.message === 'Limit cannot be greater than 100') {
      throw new BadRequestException('Limit cannot be greater than 100');
    }
    if (e.response?.message === 'Page cannot be less than 1') {
      throw new BadRequestException('Page cannot be less than 1');
    }
    if (e.response?.message === 'Sort must be in the format key:value') {
      throw new BadRequestException('Sort must be in the format key:value');
    }
    if (e.response?.message === 'Invalid sort value - must be 1 or -1') {
      throw new BadRequestException('Invalid sort value - must be 1 or -1');
    }
    if (e.errors) {
      const missingFields = Object.keys(e.errors);
      throw new BadRequestException(
        `Required fields are missing: ${missingFields.join(', ')}`,
      );
    }
    throw new InternalServerErrorException(e.code);
  }
}
