import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate the password hash
    const hash = await argon.hash(dto.password);

    //save the user to the database and return the user
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash,
          firstName: dto.firstName,
          lastName: dto.lastName,
        },
      });
      return this.token(user);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ForbiddenException('User already exists');
      }
      throw error;
    }
  }

  async login(dto: AuthDto) {
    //find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if the user is not found, throw an exception
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    //check if the password matches with the hash
    const pwMatch = await argon.verify(user.hash, dto.password);

    //if the password does not match, throw an exception
    if (!pwMatch) {
      throw new ForbiddenException('Password is incorrect');
    }

    return this.token(user);
  }

  //jwt tokenizer
  async token(user: any): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const secret = this.configService.get('JWT_SECRET');
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: '9h',
      secret: secret,
    });
    return {
      access_token: token,
    };
  }

  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
