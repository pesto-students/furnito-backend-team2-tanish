import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { UserDetails } from '../user/user-details.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserDetails | any> {
    const { name, email, password } = user;
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }
    const hashedPassword = await this.hashPassword(password);
    const newUser = await this.userService.create(name, email, hashedPassword);
    return this.userService._getUserDetails(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserDetails | any> {
    const user = await this.userService.findOneByEmail(email);
    const doesUserExist = !!user;
    if (!doesUserExist) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );
    if (!doesPasswordMatch) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return this.userService._getUserDetails(user);
  }

  async login(existingUser: ExistingUserDTO): Promise<{ access_token } | null> {
    const { email, password } = existingUser;
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new HttpException('User does not exist', HttpStatus.UNAUTHORIZED);
    }
    const jwt = await this.jwtService.signAsync({ user }, { expiresIn: '8h' });
    return { access_token: jwt };
  }

  async verifyJwt(jwt: any): Promise<{ valid_token }> {
    try {
      const { exp } = await this.jwtService.verify(jwt.access_token);
      // check if the expiry time is greater than the current time
      return exp > Date.now() / 1000
        ? { valid_token: true }
        : { valid_token: false };
    } catch (error) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
