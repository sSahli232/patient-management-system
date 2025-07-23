import { User } from '../../users/entities/user.entity';
import { IUserRepository } from '../../users/ports/user-repository.interface';
import { ITokenGenerator } from '../ports/token-generator.interface';
import { Injectable } from '@nestjs/common';

export interface IAuthenticate {
  authenticate(token: string): Promise<User>;
}

@Injectable()
export class Authenticate implements IAuthenticate {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async authenticate(token: string): Promise<User> {
    const decodedToken = await this.tokenGenerator.validate(token);
    const payload = JSON.parse(decodedToken);

    const user = await this.userRepository.findById(payload.id);

    if (user === null) {
      throw new Error('User not found');
    }

    return user;
  }
}
