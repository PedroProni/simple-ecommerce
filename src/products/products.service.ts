import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Product } from './entities/product.entity';


@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const createProduct = new this.productModel(createProductDto);
    const result = await createProduct.save();
    return plainToInstance(Product, result.toJSON());
  }

  async findAll() {
    const products = await this.productModel.find().populate('stocks').populate('prices').exec();
    return products.map(product => plainToInstance(Product, product.toJSON()));
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('stocks').populate('prices').exec();
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return plainToInstance(Product, product.toJSON());
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.updateOne({ _id: id }, updateProductDto).exec();
    if (!updatedProduct) {
      throw new NotFoundException('Product not found');
    }
    return plainToInstance(Product, updatedProduct);
  }

  remove(id: string) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
