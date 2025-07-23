export type Role = 'admin' | 'user';

export type User = {
  id: string;
  email: string;
  accessToken: string
  roles: Role[];
}