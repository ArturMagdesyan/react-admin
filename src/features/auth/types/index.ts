export type AuthUser = {
  id: string,
  username: string,
  firstName: string,
  lastName: string,
  bio: string,
  role: 'ADMIN' | 'USER',
};

export type UserResponse = {
  access_token: string,
  user: AuthUser,
};

export interface CreatePassword {
  email: string;
  password: string;
  token: string;
}

export type Email = Pick<CreatePassword, 'email'>;
