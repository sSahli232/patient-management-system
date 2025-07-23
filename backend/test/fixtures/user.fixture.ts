import { IFixture } from '../utils/fixture';
import { TestApp } from '../utils/test-app';
import { User } from '../../src/users/entities/user.entity';
import {
  I_USER_REPOSITORY,
  IUserRepository,
} from '../../src/users/ports/user-repository.interface';

export class UserFixture implements IFixture {
  constructor(public entity: User) {}

  async load(app: TestApp): Promise<void> {
    const userRepository = app.get<IUserRepository>(I_USER_REPOSITORY);
    await userRepository.create(this.entity);
  }
}
