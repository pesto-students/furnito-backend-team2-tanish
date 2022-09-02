import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { CategoryDocument } from './schemas/category.schemas';

@Controller('category')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('add')
  create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryDocument> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get('get')
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.categoriesService.findAll(paginateSortDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<CategoryDocument> {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // only-admin
  @Delete('delete')
  @UseGuards(JwtGuard)
  remove(@Query('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
