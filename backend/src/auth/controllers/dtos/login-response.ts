import { Role } from '../../../users/entities/user.entity';

export type LoginResponse = {
  id: string;
  email: string;
  accessToken: string;
  roles: Role[];
};
