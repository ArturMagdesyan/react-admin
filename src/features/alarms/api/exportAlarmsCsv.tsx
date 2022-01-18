import { useMutation } from 'react-query';
import axios from '../../../app/axios';
import { convertQueryString } from '../../../utils/convertQueryString';
import { CsvResponseData } from '../../../common/types';
import type { AlarmFilterState, AlarmType } from '../types';
import { exportCsvErrorHandler } from '../../../utils/errorHandler';
import { downloadCsv } from '../../../utils/downloadCsv';

interface QueryParams
  extends Omit<AlarmFilterState, 'isMonth' | 'isToday'>{}

interface Props {
  filterData: QueryParams;
  type: AlarmType;
}

const exportCsv = async ({ filterData, type }: Props): Promise<CsvResponseData> => {
  const query = convertQueryString(filterData);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/alarms/${type}?${query}`);
  downloadCsv('Alarms', response);

  return response;
};

export const useExportAlarmsCsv = () => useMutation(
  exportCsv,
  {
    onError: exportCsvErrorHandler,
  },
);
