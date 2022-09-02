import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { IUser } from '../types/user';
import { User } from '../decorators/user.decorator';
import { IOrder } from '../types/order';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { ObjectId, Types } from 'mongoose';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('add')
  create(@Body() createOrderDto: CreateOrderDto): Promise<any> {
    return this.orderService.create(createOrderDto);
  }

  @Get('get')
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.orderService.findAll(paginateSortDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<any> {
    return this.orderService.findOne(id);
  }

  @Patch('cancel/:id')
  findOneAndCancel(
    @Param('id') id: Types.ObjectId,
    @Body() body: { status: string },
  ): Promise<any> {
    return this.orderService.findOneAndCancel(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
