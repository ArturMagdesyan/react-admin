import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import { CsvResponseData } from '../../../common/types';
import { NotificationsFilterState } from '../types';
import { exportCsvErrorHandler } from '../../../utils/errorHandler';
import { downloadCsv } from '../../../utils/downloadCsv';

interface QueryParams
  extends Omit<NotificationsFilterState, 'isMonth' | 'isToday'>{}

const exportCsv = async (queryParams: QueryParams): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/notifications?${query}`);
  downloadCsv('Notifications', response);

  return response;
};

export const useExportNotificationsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
