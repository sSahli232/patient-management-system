import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginBody } from './dtos/login-body';
import { LoginResponse } from './dtos/login-response';
import { Login } from '../services/login.service';
import { Public } from '../decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: Login) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async handleLogin(@Body() body: LoginBody): Promise<LoginResponse> {
    return this.loginService.login({
      email: body.email,
      password: body.password,
    });
  }
}
