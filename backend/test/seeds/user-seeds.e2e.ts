import { UserFixture } from '../fixtures/user.fixture';
import { User } from '../../src/users/entities/user.entity';
export const e2eUsers = {
  alice: new UserFixture(
    new User({
      id: 'alice-id',
      email: 'alice@gmail.com',
      password: 'azerty',
    }),
  ),
  bob: new UserFixture(
    new User({
      id: 'bob-id',
      email: 'bob@gmail.com',
      password: 'azerty',
    }),
  ),
  aliceWithHashedPassword: new UserFixture(
    new User({
      id: 'alice-id',
      email: 'alice@gmail.com',
      password: '$2b$10$nxmAvbEnCj1vwIAihoIOROw07IKFlfrgtdPvW03P.KJGlWE/hI0Qa',
    }),
  ),
};
