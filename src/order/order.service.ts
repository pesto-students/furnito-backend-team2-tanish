import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import { Order, OrderDocument } from './schema/order.schema';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order | any> {
    // create an order
    const order = await new this.orderModel(createOrderDto);
    return order.save();
  }

  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder } = paginateDto;
    const docs: Order[] = await this.orderModel
      .find()
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    return docs;
  }

  async findOne(userId: string): Promise<any[]> {
    const orders = await this.orderModel.find({ user: userId });
    if (!orders) {
      throw new Error('No orders found');
    }
    return orders;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async findOneAndCancel(
    _id: Types.ObjectId,
    body: { status: string },
  ): Promise<any> {
    const status = body?.status;
    // find the order and update the status to cancelled
    const order = await this.orderModel.findOneAndUpdate(
      { _id },
      { status },
      { new: true },
    );
    if (!order) {
      throw new Error('No order found');
    }
    return order;
  }
}
