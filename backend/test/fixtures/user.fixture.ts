import { IFixture } from '../utils/fixture';
import { TestApp } from '../utils/test-app';
import { User } from '../../src/users/entities/user.entity';
import {
  I_TOKEN_GENERATOR,
  ITokenGenerator,
} from '../../src/auth/ports/token-generator.interface';
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

  async createAuthorizationToken(app: TestApp) {
    const tokenGenerator = app.get<ITokenGenerator>(I_TOKEN_GENERATOR);
    const payload = {
      id: this.entity.props.id,
      email: this.entity.props.email,
    };
    const accessToken = await tokenGenerator.generate({
      key: JSON.stringify(payload),
      expirationInMs: 60 * 60 * 1000,
    });
    // return `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXkiOiJ7XCJpZFwiOlwiYWxpY2UtaWRcIixcImVtYWlsXCI6XCJhbGljZUBnbWFpbC5jb21cIn0iLCJpYXQiOjE3NTMyNzA1NjUsImV4cCI6MTc1MzI3NDE2NX0.B0a9wmYoAG2s5aGkgn_G2E9Sllca7YBwMpbN0oYEGI0`;

    return `Bearer ${accessToken}`;
  }
}
