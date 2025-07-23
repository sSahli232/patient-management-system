import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { I_TOKEN_GENERATOR } from './ports/token-generator.interface';
import { JwtTokenGenerator } from './adapters/jwt-token-generator';
import { Login } from './services/login.service';
import { I_USER_REPOSITORY } from '../users/ports/user-repository.interface';
import { I_HASHING } from '../users/ports/hashing.interface';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    {
      provide: I_TOKEN_GENERATOR,
      useFactory: () => {
        return new JwtTokenGenerator('very_secret'); // TODO: move the secret in config/env
      },
    },
    {
      provide: Login,
      inject: [I_USER_REPOSITORY, I_HASHING, I_TOKEN_GENERATOR],
      useFactory: (userRepository, hashing, tokenGenerator) => {
        return new Login(userRepository, hashing, tokenGenerator);
      },
    },
  ],
})
export class AuthModule {}
