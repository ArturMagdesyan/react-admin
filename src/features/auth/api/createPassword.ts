import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import type { CreatePassword } from '../types';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const createPassword = async (credentials: CreatePassword): Promise<string> => {
  const response = await axios.post<string, string>('auth/password-creation', credentials);

  return response;
};

export const useCreatePassword = () => useMutation(
  createPassword,
  {
    onError: mutationErrorHandler,
  },
);
