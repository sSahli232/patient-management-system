import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LoginBody } from './dtos/login-body';
import { LoginResponse } from './dtos/login-response';
import { Login } from '../services/login.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @HttpCode(200)
  @Post('login')
  async handleLogin(@Body() body: LoginBody): Promise<LoginResponse> {
    return this.login.login({
      email: body.email,
      password: body.password,
    });
  }
}
