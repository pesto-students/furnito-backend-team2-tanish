import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { GetUser } from '../auth/decorator/get-user.decorator.';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getProfile(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Patch('edit')
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @UseGuards(JwtGuard)
  @Delete('delete')
  deleteUser(@GetUser('id') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
