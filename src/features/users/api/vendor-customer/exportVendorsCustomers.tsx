import { useMutation } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import { CsvResponseData } from '../../../../common/types';
import { VendorsCustomersFilterState } from '../../types';
import { downloadCsv } from '../../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../../utils/errorHandler';

const exportCsv = async (queryParams: VendorsCustomersFilterState): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/vendor-customers?${query}`);
  downloadCsv('Vendor-customers', response);

  return response;
};

export const useExportVendorsCustomersCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
