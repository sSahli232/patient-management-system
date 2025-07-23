import { IUserRepository } from '../../users/ports/user-repository.interface';
import { IHashing } from '../../users/ports/hashing.interface';
import { ITokenGenerator } from '../ports/token-generator.interface';

type Request = {
  email: string;
  password: string;
};

type Response = {
  accessToken: string;
};

export class Login {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashing: IHashing,
    private readonly tokenGenerator: ITokenGenerator,
  ) {}

  async login({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmailAddress(email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.hashing.compare(
      password,
      user.props.password,
    );

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await this.tokenGenerator.generate({
      key: user.props.id,
      expirationInMs: 60 * 60 * 1000, // 1h
    });

    return {
      accessToken,
    };
  }
}
