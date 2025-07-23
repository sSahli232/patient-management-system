export type User = {
  id: string;
  email: string;
  accessToken: string
  role: 'admin' | 'user';
}