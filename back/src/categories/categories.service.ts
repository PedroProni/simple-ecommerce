import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  // Methods for managing categories

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createCategory = new this.categoryModel(createCategoryDto);
      if (createCategory.parent_category_code) {
        await this.categoryExists(
          'category_code',
          createCategory.parent_category_code,
        );
      }
      const category_already_exists = await this.categoryModel.find({
        category_code: createCategory.category_code,
      });
      if (category_already_exists.length > 0) {
        throw new ConflictException('Category already exists');
      }
      const category = await createCategory.save();
      return instanceToPlain(new Category(category.toJSON()));
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findAll(category_code, updated_at, limit = 10, page = 1) {
    try {
      if (category_code) {
        await this.findByCategoryCode(category_code, limit, page);
      }
      if (updated_at) {
        await this.findByUpdatedAt(updated_at, limit, page);
      }
      const categories = await this.categoryModel
        .find()
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();
      return categories.map((category) =>
        instanceToPlain(new Category(category.toJSON())),
      );
    } catch (e) {
      await this.handleException(e);
    }
  }

  async findOne(id: string) {
    try {
      return await this.categoryExists('_id', id);
    } catch (e) {
      await this.handleException(e);
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryExists('_id', id);
      await this.categoryModel.updateOne({ _id: id }, updateCategoryDto).exec();
      const updated_category = await this.categoryModel.findById(id).exec();
      return updated_category;
    } catch (e) {
      await this.handleException(e);
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryExists('_id', id);
      await this.categoryModel.deleteOne({ _id: id }).exec();
      return category;
    } catch (e) {
      await this.handleException(e);
    }
  }

  // Helper methods for processing and managing category-related logic

  async categoryExists(key: string, value: string) {
    const category = await this.categoryModel.findOne({ [key]: value }).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findByCategoryCode(category_code: string, limit = 10, page = 1) {
    const category = await this.categoryModel
      .find({
        category_code: category_code,
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (category.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async findByUpdatedAt(updated_at: Date, limit = 10, page = 1) {
    const categories = await this.categoryModel
      .find({ updated_at: { $gt: updated_at } })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    if (categories.length === 0) {
      throw new NotFoundException('Category not found');
    }
    return categories.map((category) =>
      instanceToPlain(new Category(category.toJSON())),
    );
  }

  // Method for handling exceptions

  async handleException(e) {
    if (e.response?.message === 'Category already exists') {
      throw new ConflictException('Category already exists');
    }
    if (e.response?.message === 'Category not found') {
      throw new ConflictException('Father category not found');
    }
    if (e.response?.message === 'Category not found') {
      throw new NotFoundException('Category not found');
    }
    throw new InternalServerErrorException();
  }
}
