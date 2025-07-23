import { IUserRepository } from '../ports/user-repository.interface';
type Request = {
  userId: string;
};

type Response = {
  id: string;
  email: string;
};

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: Request): Promise<Response> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.props.id,
      email: user.props.email,
    };
  }
}
