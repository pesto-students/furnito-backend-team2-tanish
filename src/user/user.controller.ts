import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { UserDocument } from './schema/user.schema.';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // Admin only - get all users
  @Get('get')
  getAll(@Query() paginateSortDto: PaginateDto) {
    return this.userService.findAll(paginateSortDto);
  }

  // User Details by user id
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get use details' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard)
  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  // update user details
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Update user details' })
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateUserDto })
  @UseGuards(JwtGuard)
  @Put('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    return this.userService.update(id, updateUserDto);
  }

  // update user details
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Get use details' })
  @ApiParam({ name: 'id', required: true })
  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string): Promise<string | null> {
    return this.userService.delete(id);
  }
}
