import { useMutation } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import { CsvResponseData } from '../../../../common/types';
import { CustomerFilterState } from '../../types';
import { downloadCsv } from '../../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../../utils/errorHandler';

const exportCsv = async (queryParams: CustomerFilterState): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/customers?${query}`);
  downloadCsv('Customers', response);

  return response;
};

export const useExportCustomersCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
