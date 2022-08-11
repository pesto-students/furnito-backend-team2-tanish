import { ForbiddenException, Injectable } from '@nestjs/common';
import { EditUserDto } from './dto/edit-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        ...dto,
      },
    });
    delete user.hash;
    return user;
  }

  async deleteUser(userId: string) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id: userId },
      });
      delete user.hash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
  }
}
