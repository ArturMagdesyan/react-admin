import { useMutation } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import { CsvResponseData } from '../../../../common/types';
import { VendorFilterState } from '../../types';
import { downloadCsv } from '../../../../utils/downloadCsv';
import { exportCsvErrorHandler } from '../../../../utils/errorHandler';

const exportCsv = async (queryParams: VendorFilterState): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/vendors?${query}`);
  downloadCsv('Vendors', response);

  return response;
};

export const useExportVendorsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
