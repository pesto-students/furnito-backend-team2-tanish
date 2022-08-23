import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | any> {
    const createdProduct = await new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // sorting and pagination
  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder } = paginateDto;
    const docs: Product[] = await this.productModel
      .find()
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    return docs;
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(
        id,
        { ...updateProductDto },
        { useFindAndModify: false },
      )
      .exec();
  }

  async remove(id: string) {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }
}
