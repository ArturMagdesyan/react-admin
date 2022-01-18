import axios from '../../../app/axios';

import { AuthUser } from '../types';

export const getUser = (): Promise<AuthUser> => axios.get('/user/me');
