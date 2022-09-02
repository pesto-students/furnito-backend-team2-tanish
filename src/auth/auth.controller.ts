import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserDetails } from '../user/user-details.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }

  // update password
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  updatePassword(
    @Body() payload: { jwt: string; password: string; newPassword: string },
  ) {
    return this.authService.updatePassword(
      payload.jwt,
      payload.password,
      payload.newPassword,
    );
  }

  //reset password
  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  resetPassword(@Body() payload: { email: string }) {
    return this.authService.resetPassword(payload.email);
  }
}
