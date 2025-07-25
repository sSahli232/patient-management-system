import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserByIdResponse } from './dtos/get-user-by-id-response';
import { GetUserByIdUseCase } from '../usecases/get-user-by-id';
import { CreateUserUseCase } from '../usecases/create-user';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUserResponse } from './dtos/create-user-response';
import { Public } from '../../auth/decorators/public.decorator';
import { CreateAdminUserUseCase } from '../usecases/create-admin-user';
import { CreateAdminUserBody } from './dtos/create-admin-user-body';
import { CreateAdminUserResponse } from './dtos/create-admin-user-response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly createAdminUser: CreateAdminUserUseCase,
  ) {}

  @Public()
  @Post()
  async handleCreateUser(
    @Body() body: CreateUserBody,
  ): Promise<CreateUserResponse> {
    return this.createUser.execute({
      email: body.email,
      password: body.password,
    });
  }

  @Public()
  @Post('admin')
  async handleCreateAdminUser(
    @Body() body: CreateAdminUserBody,
  ): Promise<CreateAdminUserResponse> {
    return this.createAdminUser.execute({
      email: body.email,
      password: body.password,
    });
  }

  @Get(':id')
  async handleGetUserById(
    @Param('id') id: string,
  ): Promise<GetUserByIdResponse> {
    return this.getUserById.execute({ userId: id });
  }
}
