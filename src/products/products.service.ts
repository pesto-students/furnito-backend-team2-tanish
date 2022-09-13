import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { ProductReviewDto } from './dto/product-review.dto';
import { UserDetailsDto } from '../user/dto/user-details.dto';
import { User } from '../user/schema/user.schema.';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private productModel: Model<ProductDocument>,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product | any> {
    const createdProduct = await new this.productModel(createProductDto);
    return createdProduct.save();
  }

  // searching sorting and pagination for products
  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder, name } = paginateDto;
    const docs: Product[] = await this.productModel
      .find(name ? { name: { $regex: name, $options: 'i' } } : {})
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    const total = await this.productModel.countDocuments().exec();
    return {
      products: docs,
      total,
      page,
    };
  }

  async findById(id: string): Promise<any> {
    // find product by id
    const product = await this.productModel.findById({ _id: id }).exec();
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    // check for id validity
    const product = await this.productModel.findById({ _id: id }).exec();
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }

    // update product
    return await this.productModel
      .findByIdAndUpdate({ _id: id }, updateProductDto, { new: true })
      .exec();
  }

  // delete product
  async remove(id: string): Promise<any> {
    return await this.productModel.deleteOne({ _id: id }).exec();
  }

  async addReview(
    params: UserDetailsDto,
    review: ProductReviewDto,
  ): Promise<any> {
    const product = await this.productModel.findById(review.productId).exec();
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }

    // check if user has already reviewed the product
    const isReviewed = product.reviews.find(
      (r) => r.user.toString() === params.userId.toString(),
    );

    // if user has already reviewed the product, update the review
    if (isReviewed) {
      product.reviews.forEach((productReview) => {
        if (productReview.user.toString() === params.userId.toString()) {
          productReview.name = params.username;
          productReview.rating = review.rating;
          productReview.comment = review.comment;
          productReview.updatedAt = new Date();
        }
      });
    } else {
      // if user has not reviewed the product, add a new review
      product.reviews.push({
        user: new Types.ObjectId(params.userId),
        name: params.username,
        rating: review.rating,
        comment: review.comment,
        updatedAt: new Date(),
      });
      // update the number of reviews
      product.numOfReviews = product.reviews.length;
    }

    // average rating
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numOfReviews;

    // save the product
    return await product.save();
  }

  // searching sorting and pagination for product reviews
  async getProductReviews(id: string, paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder } = paginateDto;
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }
    const docs = await this.productModel
      .findById({ _id: id })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .select('reviews')
      .exec();

    const total = product.reviews.length;
    return {
      reviews: docs,
      total,
      page,
    };
  }

  async deleteProductReview(
    id: string,
    reviewId: string,
  ): Promise<ProductDocument> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new HttpException('No product found', HttpStatus.NOT_FOUND);
    }

    if (product.numOfReviews === 0) {
      throw new HttpException('No review found', HttpStatus.NOT_FOUND);
    }

    // average rating
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.numOfReviews;

    if (product.ratings === 0) {
      product.ratings = 0;
    }

    return await this.productModel
      .findByIdAndUpdate(
        { _id: id },
        {
          $pull: { reviews: { _id: reviewId } },
          $inc: { numOfReviews: -1 },
          ratings: product.ratings,
        },
        { new: true },
      )
      .exec();
  }
}
