import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NewUserDTO } from '../user/dto/new-user.dto';
import { ExistingUserDTO } from '../user/dto/existing-user.dto';
import { UserDetails } from '../user/user-details.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { VerifyTokenDto } from '../user/dto/verify-token.dto';

@ApiBearerAuth()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // register user
  @ApiOperation({ summary: 'Creates a new User' })
  @ApiBody({ type: NewUserDTO })
  @Post('register')
  register(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  // user login
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: ExistingUserDTO })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: ExistingUserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  // verify JWT token
  @ApiOperation({ summary: 'Verify user' })
  @ApiBody({ type: VerifyTokenDto })
  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: VerifyTokenDto) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
