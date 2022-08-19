import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://furnito:furnito123@cluster0.pbn2qja.mongodb.net/User?retryWrites=true&w=majority',
    ),
    UserModule,
    AuthModule,
    ProductsModule,
    StripeModule,
  ],
})
export class AppModule {}
