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
  login(
    @Body() user: ExistingUserDTO,
  ): Promise<{ access_token: string } | null> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(
    @Body() jwt: { access_token: string },
  ): Promise<{ valid_token: boolean }> {
    return this.authService.verifyJwt(jwt);
  }
}
