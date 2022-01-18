import axios from '../../../app/axios';

import { UserResponse } from '../types';

export type LoginCredentialsDTO = {
  username: string;
  password: string;
};

export const loginWithEmailAndPassword = (data: LoginCredentialsDTO): Promise<UserResponse> => axios.post('/login', data);
