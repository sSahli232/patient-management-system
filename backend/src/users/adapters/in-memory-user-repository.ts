import { User } from '../entities/user.entity';
import { IUserRepository } from '../ports/user-repository.interface';

const rootAdmin = new User({
  id: 'admin-id',
  email: 'admin@mail.com',
  password: '$2b$10$WzOryozGBpphYwI3NS1/9.JsXt/fGOIi/85d7PZhLFRnRq24bznfe',
  roles: ['admin'],
});
export class InMemoryUserRepository implements IUserRepository {
  constructor(private readonly database: User[] = []) {
    this.database.push(rootAdmin);
  }

  async create(user: User): Promise<void> {
    this.database.push(user);
  }

  async findByEmailAddress(emailAddress: string): Promise<User | null> {
    const user = this.database.find(
      (user) => user.props.email === emailAddress,
    );

    return user ?? null;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.database.find((user) => user.props.id === id);

    return user ?? null;
  }
}
