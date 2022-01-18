import { useMutation } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type { CsvResponseData } from '../../../../common/types';
import { downloadCsv } from '../../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../../utils/errorHandler';
import type { DocumentsFilterState } from '../../../common/features/documents-table/types';

interface Props {
  userId: string;
  filter: DocumentsFilterState;
}

const exportCsv = async ({ userId, filter }: Props): Promise<CsvResponseData> => {
  const query = convertQueryString(filter);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/users/${userId}/documents?${query}`);
  downloadCsv('User-documents', response);

  return response;
};

export const useExportUserDocumentsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
