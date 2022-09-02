import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { ProductDocument } from './schemas/product.schema';
import { JwtGuard } from '../auth/guard/jwt.guard';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // only-admin
  @Post('add')
  @UseGuards(JwtGuard)
  create(@Body() createProductDto: CreateProductDto): Promise<ProductDocument> {
    return this.productsService.create(createProductDto);
  }

  @Get('get')
  @UseGuards(JwtGuard)
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.productsService.findAll(paginateSortDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<ProductDocument> {
    return this.productsService.findOne(id);
  }

  // only-admin
  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  // only-admin
  @Delete('delete')
  @UseGuards(JwtGuard)
  remove(@Query('id') id: string) {
    return this.productsService.remove(id);
  }
}
