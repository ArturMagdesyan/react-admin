import { useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import axios from '../../../app/axios';
import { curriedErrorHandler } from '../../../utils/errorHandler';

interface Props {
  userId: string;
  data: {
    smsCode: string;
    phoneNumber: string;
  };
}

const phoneNumberVerification = async ({ userId, data }: Props) => {
  const response = await axios.post(`users/${userId}/additional-phone-verification`, data);

  return response;
};

export const usePhoneNumberVerification = () => {
  const queryClient = useQueryClient();

  return useMutation(
    phoneNumberVerification,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('userProfile');
      },
      onError: (err: AxiosError) => {
        const errorCode = err.response?.data.errorCode;
        const errorMap = new Map<number, string>();
        errorMap.set(400, `errors.userCredentialsDialog.${errorCode}`);

        curriedErrorHandler(err, errorMap);
      },
    },
  );
};
