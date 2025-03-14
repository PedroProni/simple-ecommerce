import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const createProduct = new this.productModel(createProductDto);
    const result = await createProduct.save();
    return new Product(result.toJSON());
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.updateOne({ _id: id }, updateProductDto).exec();
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }
}
