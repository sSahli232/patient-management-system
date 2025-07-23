/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { I_USER_REPOSITORY } from './ports/user-repository.interface';
import { InMemoryUserRepository } from './adapters/in-memory-user-repository';
import { GetUserByIdUseCase } from './usecases/get-user-by-id';
import { CommonModule } from '../core/common.module';
import { I_HASHING } from './ports/hashing.interface';
import { RealHashing } from './adapters/real-hashing';
import { CreateUserUseCase } from './usecases/create-user';
import { I_ID_GENERATOR } from '../core/ports/id-generator.interface';

@Module({
  imports: [CommonModule],
  controllers: [UsersController],
  providers: [
    {
      provide: I_USER_REPOSITORY,
      useFactory: () => {
        return new InMemoryUserRepository();
      },
    },
    {
      provide: I_HASHING,
      useFactory: () => {
        return new RealHashing();
      },
    },
    {
      provide: GetUserByIdUseCase,
      inject: [I_USER_REPOSITORY],
      useFactory(userRepository) {
        return new GetUserByIdUseCase(userRepository);
      },
    },
    {
      provide: CreateUserUseCase,
      inject: [I_USER_REPOSITORY, I_ID_GENERATOR, I_HASHING],
      useFactory(userRepository, idGenerator, hashing) {
        return new CreateUserUseCase(userRepository, idGenerator, hashing);
      },
    },
  ],
  exports: [I_USER_REPOSITORY, I_HASHING],
})
export class UsersModule {}
