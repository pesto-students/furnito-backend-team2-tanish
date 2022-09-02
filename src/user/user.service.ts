import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema.';
import { ExistingUserDTO } from './dto/existing-user.dto';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { Product } from '../products/schemas/product.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      name: user.name,
      email: user.email,
    };
  }

  async findOneByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      return null;
    }
    return this._getUserDetails(await user);
  }

  async create(
    name: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return newUser.save();
  }

  delete(id: string) {
    return this.userModel.findByIdAndDelete(id);
  }

  async update(
    id: string,
    updateUserDto: ExistingUserDTO,
  ): Promise<UserDocument | null> {
    return await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { useFindAndModify: false })
      .exec();
  }

  async updatePassword(id, hashedPassword: string) {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { password: hashedPassword },
        { useFindAndModify: false },
      )
      .exec();
  }

  async resetPassword(email: string) {
    return this.userModel.findOneAndUpdate(
      { email },
      { password: '123456' },
      { useFindAndModify: false },
    );
  }

  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder } = paginateDto;
    const docs: User[] = await this.userModel
      .find()
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    return docs;
  }

  async isAdmin(user: UserDocument): Promise<boolean> {
    const dbUser = await this.userModel.findById(user._id).exec();
    return dbUser.role === 'admin';
  }
}
