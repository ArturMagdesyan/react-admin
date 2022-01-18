import { useMutation } from 'react-query';
import axios from '../../../../../app/axios';
import type { UploadFileResponse } from '../types';

const uploadFile = async (file: File): Promise<UploadFileResponse> => {
  const formData: FormData = new FormData();
  formData.append('file', file);
  formData.append('resource', 'ORDER_DOCUMENT');
  const response = await axios.post<UploadFileResponse, UploadFileResponse>(
    'files',
    formData,
  );

  return response;
};

export const useUploadFile = () => useMutation(uploadFile);
