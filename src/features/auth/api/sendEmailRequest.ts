import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import type { Email } from '../types';
import { mutationErrorHandler } from '../../../utils/errorHandler';

const sendEmailRequest = async (credentials: Email): Promise<string> => {
  const response = await axios.post<string, string>('auth/password-creation-email-request', credentials);

  return response;
};

export const useSendEmailRequest = () => useMutation(
  sendEmailRequest,
  {
    onError: mutationErrorHandler,
  },
);
