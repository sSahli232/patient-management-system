import { IUserRepository } from '../../users/ports/user-repository.interface';
import { IHashing } from '../../users/ports/hashing.interface';
import { ITokenGenerator } from '../ports/token-generator.interface';
import { Role } from '../../../dist/users/entities/user.entity';

const DEFAULT_EXPIRES = '1h';

type Request = {
  email: string;
  password: string;
};

type Response = {
  id: string;
  email: string;
  accessToken: string;
  roles: Role[];
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

    const payload = JSON.stringify({
      id: user.props.id,
      email: user.props.email,
      roles: user.props.roles,
    });

    const accessToken = await this.tokenGenerator.generate({
      key: payload,
      expiresIn: (process.env.JWT_EXPIRES_HOUR as string) ?? DEFAULT_EXPIRES,
    });

    return {
      id: user.props.id,
      email: user.props.email,
      roles: user.props.roles,
      accessToken,
    };
  }
}
