import { useMutation } from 'react-query';
import axios from '../../../../app/axios';
import { convertQueryString } from '../../../../utils/convertQueryString';
import type { CsvResponseData } from '../../../../common/types';
import type { BlockListFilterState } from '../../types';
import { downloadCsv } from '../../../../utils/downloadCsv';

const exportCsv = async (queryParams: BlockListFilterState): Promise<CsvResponseData> => {
  const query = convertQueryString(queryParams);
  const response = await axios.get<CsvResponseData, CsvResponseData>(`csv/block-list?${query}`);
  downloadCsv('Block-list', response);

  return response;
};

export const useExportBlockListCsv = () => useMutation(
  exportCsv,
);
