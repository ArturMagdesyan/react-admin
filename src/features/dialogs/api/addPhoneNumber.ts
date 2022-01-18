import { useMutation } from 'react-query';
import type { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

interface Props {
  phoneNumber: string;
  userId: string;
}

const addPhoneNumber = async ({ userId, phoneNumber }: Props) => {
  const response = await axios.post(
    `users/${userId}/add-additional-phone-number`,
    { phoneNumber: `+7${phoneNumber}` },
  );

  return response;
};

export const useAddPhoneNumber = () => (useMutation(
  addPhoneNumber,
  {
    onError: (err: AxiosError) => {
      const errorCode = err.response?.data.errorCode;
      const errorMap = new Map<number, string>();
      errorMap.set(400, `errors.userCredentialsDialog.${errorCode}`);

      curriedErrorHandler(err, errorMap);
    },
  },
));
