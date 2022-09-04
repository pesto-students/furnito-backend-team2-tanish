import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { isEmail } from 'validator';

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Name cannot exceed 30 characters'],
    minLength: [4, 'Name should have more than 4 characters'],
    type: String,
  })
  name: string;

  @Prop({
    required: [true, 'Please enter your email'],
    unique: true,
    validate: [isEmail, 'Please Enter a valid Email'],
    type: String,
  })
  email: string;

  @Prop({
    required: [true, 'Please enter your password'],
    minLength: [8, 'Password should be greater than 8 characters'],
    select: false,
    type: String,
  })
  password: string;

  @Prop({ default: 'user', type: String })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
