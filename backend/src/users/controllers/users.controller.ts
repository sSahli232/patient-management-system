import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetUserByIdResponse } from './dtos/get-user-by-id-response';
import { GetUserByIdUseCase } from '../usecases/get-user-by-id';
import { CreateUserUseCase } from '../usecases/create-user';
import { CreateUserBody } from './dtos/create-user-body';
import { CreateUserResponse } from './dtos/create-user-response';

@Controller('users')
export class UsersController {
  constructor(
    private readonly getUserById: GetUserByIdUseCase,
    private readonly createUser: CreateUserUseCase,
  ) {}

  @Post()
  async handleCreateUser(
    @Body() body: CreateUserBody,
  ): Promise<CreateUserResponse> {
    return this.createUser.execute({
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
