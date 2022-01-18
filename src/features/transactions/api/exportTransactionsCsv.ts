import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import type { CsvResponseData } from '../../../common/types';
import type { TransactionFilterState } from '../types';
import { downloadCsv } from '../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../utils/errorHandler';

interface QueryParams
  extends Omit<TransactionFilterState, 'isMonth' | 'isToday'>{}

const exportCsv = async (queryParams: QueryParams): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/transactions?${query}`);
  downloadCsv('Transactions', response);

  return response;
};

export const useExportTransactionsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
