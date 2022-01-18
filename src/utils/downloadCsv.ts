import { CsvResponseData } from '../common/types';

export const downloadCsv = (
  fileName: string,
  csvData: CsvResponseData,
) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = `data:${csvData.mediaType};base64,${csvData.data}`;
  downloadLink.download = `${fileName}.csv`;
  downloadLink.click();
};
