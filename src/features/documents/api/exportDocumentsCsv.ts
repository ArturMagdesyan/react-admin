import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { CsvResponseData } from '../../../common/types';
import type { DocumentsFilterState } from '../../common/features/documents-table/types';
import { downloadCsv } from '../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../utils/errorHandler';

interface QueryParams
  extends Omit<DocumentsFilterState, 'isMonth' | 'isToday'>{}

const exportCsv = async (queryParams: QueryParams): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/documents?${query}`);
  downloadCsv('Documents', response);

  return response;
};

export const useExportDocumentsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
