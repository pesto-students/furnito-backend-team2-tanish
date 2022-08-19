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
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // sorting and pagination
  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { skip, limit, sortBy, sortOrder } = paginateDto;
    const count: number = await this.productModel.countDocuments().exec();
    const docs: Product[] = await this.productModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();
    return { count, docs };
  }

  async findOne(id: number) {
    return this.productModel.findById(id).exec();
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productModel
      .findByIdAndUpdate(
        id,
        { ...updateProductDto },
        { useFindAndModify: false },
      )
      .exec();
  }

  async remove(id: number) {
    return this.productModel.deleteOne({ _id: id }).exec();
  }
}
