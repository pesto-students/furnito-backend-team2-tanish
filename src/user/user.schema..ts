import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { isEmail } from 'validator';

@Schema()
export class User {
  @Prop({
    required: [true, 'Please Enter Your Name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
  })
  name: string;

  @Prop({
    required: [true, 'Please Enter Your Email'],
    unique: true,
    validate: [isEmail, 'Please Enter a valid Email'],
  })
  email: string;

  @Prop({
    required: [true, 'Please Enter Your Password'],
    minLength: [8, 'Password should be greater than 8 characters'],
  })
  password: string;

  @Prop({ default: 'user' })
  role: string;

  resetPasswordToken: string;
  resetPasswordExpires: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
