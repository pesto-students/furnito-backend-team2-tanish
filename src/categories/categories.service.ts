import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './schemas/category.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category | any> {
    const createdCategory = await new this.categoryModel(createCategoryDto);
    return createdCategory.save();
  }

  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder } = paginateDto;
    const docs: Category[] = await this.categoryModel
      .find()
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    return docs;
  }

  async findOne(id: number) {
    return this.categoryModel.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel
      .findByIdAndUpdate(
        id,
        { ...updateCategoryDto },
        { useFindAndModify: false },
      )
      .exec();
  }

  async remove(id: string) {
    return await this.categoryModel.deleteOne({ _id: id }).exec();
  }
}
