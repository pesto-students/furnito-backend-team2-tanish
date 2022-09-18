import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './schema/user.schema.';
import { PaginateDto } from '../shared/dto/paginate-sort-dto';
import { UpdateUserDto } from './dto/update-user.dto';

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
      role: user.role,
    };
  }

  async findOneByEmail(email: string): Promise<any> {
    // get user by email
    const user = await this.userModel
      .findOne({ email })
      .populate('role')
      .populate('name')
      .populate('email')
      .select('password')
      .exec();
    console.log(user);
    return user;
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = this.userModel.findById(id).exec();
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
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

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument | null> {
    console.log(id, updateUserDto);
    const updatedUser = await this.userModel
      .findOneAndUpdate({ _id: id }, updateUserDto, { new: true })
      .exec();
    if (!updatedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return updatedUser;
  }

  async delete(id: string): Promise<string> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return deletedUser.name + ' deleted successfully';
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

  async findAll(paginateDto: PaginateDto): Promise<any> {
    const { page, limit, sortBy, sortOrder, name } = paginateDto;
    const docs: User[] = await this.userModel
      .find(name?.length > 0 ? { name: { $regex: name, $options: 'i' } } : {})
      .skip((page - 1) * Number(limit))
      .limit(Number(limit))
      .sort({ [sortBy]: sortOrder })
      .exec();
    if (!docs) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
    const total = await this.userModel.countDocuments().exec();
    return {
      users: docs,
      total,
      page,
    };
  }
}
