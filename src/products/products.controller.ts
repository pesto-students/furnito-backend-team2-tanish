import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { ProductDocument } from './schemas/product.schema';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../user/schema/user.schema.';
import { UserDetails } from '../user/user-details.interface';
import { ProductReviewDto } from './dto/product-review.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserDetailsDto } from '../user/dto/user-details.dto';
import { AdminGuard } from '../auth/guard/admin.guard';

@ApiBearerAuth()
@ApiTags('product')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Add a new Product
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Add a new Product' })
  @ApiBody({ type: CreateProductDto })
  @UseGuards(JwtGuard, AdminGuard)
  @Post('add')
  create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductDocument | null> {
    return this.productsService.create(createProductDto);
  }

  // Get all products
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all products' })
  @Get('get')
  @UseGuards(JwtGuard)
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.productsService.findAll(paginateSortDto);
  }

  // get product details by id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get product details by id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard)
  @Get('get/:id')
  getProduct(@Param('id') id: string): Promise<ProductDocument | null> {
    console.log(id);
    return this.productsService.findById(id);
  }

  // update product details by id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update product details by id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard, AdminGuard)
  @Put('update/:id')
  updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // delete product
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete the product by id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard, AdminGuard)
  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  // Add or update a product review by user id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Create a new product review' })
  @UseGuards(JwtGuard)
  @Post('review/:userId/:username')
  createProductReview(
    @Param() params: UserDetailsDto,
    @Body() productReview: ProductReviewDto,
  ) {
    return this.productsService.addReview(params, productReview);
  }

  // Get all product reviews by product id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all product reviews by product id' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard, AdminGuard)
  @Get('review/:id')
  getProductReviews(
    @Param('id') id: string,
    @Query() paginateSortDto: PaginateDto,
  ) {
    return this.productsService.getProductReviews(id, paginateSortDto);
  }

  // Delete a product review by product id and review id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Delete a product review by product id' })
  @ApiParam({ name: 'id', required: true })
  @ApiQuery({ name: 'reviewId', required: true })
  @UseGuards(JwtGuard, AdminGuard)
  @Delete('review/:id')
  deleteProductReview(
    @Param('id') id: string,
    @Query() reviewId: { reviewId: string },
  ) {
    return this.productsService.deleteProductReview(id, reviewId.reviewId);
  }

  // Get all products by category
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get all products by category' })
  @Get('categories')
  @UseGuards(JwtGuard)
  findAllByCategories(@Query() paginateSortDto: PaginateDto) {
    return this.productsService.getProductsByCategories(paginateSortDto);
  }

  // get count of all products, product reviews, users and orders
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Get count of all products, product reviews, users and orders',
  })
  @UseGuards(JwtGuard, AdminGuard)
  @Get('count')
  getCount() {
    return this.productsService.getCount();
  }
}
