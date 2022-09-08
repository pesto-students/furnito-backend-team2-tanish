import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { Types } from 'mongoose';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { OrderDocument } from './schema/order.schema';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@ApiBearerAuth()
@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  // Add a new order
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add a new order' })
  @ApiBody({ type: CreateOrderDto })
  @UseGuards(JwtGuard)
  @Post('add')
  create(@Body() createOrderDto: CreateOrderDto): Promise<OrderDocument> {
    return this.orderService.create(createOrderDto);
  }

  // Get all the orders or by user id
  @ApiOperation({ summary: 'Get all the orders' })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('get')
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.orderService.findAll(paginateSortDto);
  }

  // Find the order by id and update its status
  @ApiOperation({ summary: 'Find the order by id and update its status' })
  @ApiBearerAuth('access-token')
  @ApiBody({ type: UpdateOrderStatusDto })
  @UseGuards(JwtGuard)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.findOneAndUpdateStatus(
      id,
      updateOrderStatusDto.status,
    );
  }

  // Delete an order by id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a order by id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
