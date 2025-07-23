import { IHashing } from '../ports/hashing.interface';
import { IUserRepository } from '../ports/user-repository.interface';
import { IIDGenerator } from '../../core/ports/id-generator.interface';
import { User } from '../entities/user.entity';

type Request = {
  email: string;
  password: string;
};

type Response = {
  id: string;
};

export class CreateAdminUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly idGenerator: IIDGenerator,
    private readonly hashing: IHashing,
  ) {}

  async execute({ email, password }: Request): Promise<Response> {
    const id = this.idGenerator.generate();
    const existinUser = await this.userRepository.findByEmailAddress(email);

    if (existinUser) {
      throw new Error('User already exist!');
    }

    const hashedPassword = await this.hashing.hash(password);

    const user = new User({
      id,
      email,
      password: hashedPassword,
      roles: ['admin'],
    });

    await this.userRepository.create(user);

    return {
      id,
    };
  }
}
