import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDetails } from './user-details.interface';
import { ExistingUserDTO } from './dto/existing-user.dto';
import { UserDocument } from './user.schema.';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('get')
  findAll(@Query() paginateSortDto: PaginateDto) {
    return this.userService.findAll(paginateSortDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }

  @Patch('update')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: ExistingUserDTO,
  ): Promise<UserDocument | null> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete('delete')
  deleteUser(@Query('id') id: string) {
    return this.userService.delete(id);
  }
}
