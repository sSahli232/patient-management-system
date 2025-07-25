import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from '../users/users.module';
import { I_TOKEN_GENERATOR } from './ports/token-generator.interface';
import { JwtTokenGenerator } from './adapters/jwt-token-generator';
import { Login } from './services/login.service';
import { I_USER_REPOSITORY } from '../users/ports/user-repository.interface';
import { I_HASHING } from '../users/ports/hashing.interface';
import { Authenticate } from './services/authenticate.service';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [AuthController],
  providers: [
    {
      provide: I_TOKEN_GENERATOR,
      useFactory: () => {
        return new JwtTokenGenerator(process.env.JWT_SECRET as string);
      },
    },
    {
      provide: Login,
      inject: [I_USER_REPOSITORY, I_HASHING, I_TOKEN_GENERATOR],
      useFactory: (userRepository, hashing, tokenGenerator) => {
        return new Login(userRepository, hashing, tokenGenerator);
      },
    },
    {
      provide: Authenticate,
      inject: [I_USER_REPOSITORY, I_TOKEN_GENERATOR],
      useFactory(userRepository, tokenGenerator) {
        return new Authenticate(userRepository, tokenGenerator);
      },
    },
    {
      provide: APP_GUARD,
      inject: [Authenticate, Reflector],
      useFactory: (authenticate, reflector) => {
        return new AuthGuard(authenticate, reflector);
      },
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AuthModule {}
