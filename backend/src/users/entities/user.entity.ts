import { Entity } from '../../shared/entity';

export type Role = 'admin' | 'user';

type UserProps = {
  id: string;
  email: string;
  password: string;
  roles: Role[];
};

export class User extends Entity<UserProps> {}
