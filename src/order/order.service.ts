import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  // create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order | any> {
    // create an order
    const order = await new this.orderModel(createOrderDto);
    return order.save();
  }

  // get all the orders
  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder, name } = paginateDto;
    const docs: Order[] = await this.orderModel

      // filter by user id if it exists
      .find(name ? { user: name } : {})
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    const total = await this.orderModel.countDocuments().exec();
    return {
      orders: docs,
      total,
      page,
    };
  }

  // delete an order by id
  async remove(id: string): Promise<any> {
    return await this.orderModel.findByIdAndDelete({ _id: id }).exec();
  }

  async findOneAndUpdateStatus(id: string, status: string): Promise<any> {
    // find the order and update the status to cancelled
    const order = await this.orderModel
      .findOneAndUpdate({ _id: id }, { orderStatus: status }, { new: true })
      .exec();

    if (!order) {
      throw new HttpException('No order found', HttpStatus.NOT_FOUND);
    }
    return order;
  }
}
