import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import { CsvResponseData } from '../../../common/types';
import { OrderFilterState } from '../types';
import { downloadCsv } from '../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../utils/errorHandler';

interface QueryParams
  extends Omit<OrderFilterState, 'isMonth' | 'isToday'>{}

const exportCsv = async (queryParams: QueryParams): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/orders?${query}`);
  downloadCsv('Orders', response);

  return response;
};

export const useExportOrdersCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
