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
          await this.categoryExists('category_code', createCategory.parent_category_code);
      }
      const category_already_exists = await this.categoryModel.find({ category_code: createCategory.category_code });
      if (category_already_exists.length > 0) {
        throw new ConflictException('Category already exists');
      }
      const category = await createCategory.save();
      return instanceToPlain(new Category(category.toJSON()));
    } catch (e) {
      if (e.response.message === 'Category already exists') {
        throw new ConflictException('Category already exists');
      };
      if (e.response.message === 'Category not found') {
        throw new ConflictException('Father category not found');
      };
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    try {
      const categories = await this.categoryModel.find().exec();
      return categories.map((category) =>
        instanceToPlain(new Category(category.toJSON())),
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string) {
    try {
      const category = await this.categoryExists('_id', id);
      return category;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      await this.categoryExists('_id', id);
      await this.categoryModel.updateOne({ _id: id }, updateCategoryDto).exec();
      const updated_category = await this.categoryModel.findById(id).exec();
      return updated_category;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException();
    }
  }

  async remove(id: string) {
    try {
      const category = await this.categoryExists('_id', id);
      await this.categoryModel.deleteOne({ _id: id }).exec();
      return category;
    } catch (e) {
      if (e.status === 404) {
        throw new NotFoundException('Category not found');
      }
      throw new InternalServerErrorException();
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
}
