import i18n from 'i18next';
import _ from 'lodash';
import Axios, { AxiosError } from 'axios';
import { Snackbar } from '../features/notistack';

export const errorHandler = (
  error: unknown,
  statusErrorMap: Map<number, string>,
) => {
  if (Axios.isAxiosError(error) && error.response) {
    const errorName = statusErrorMap.get(error.response.status);

    if (errorName) {
      Snackbar.error(i18n.t(errorName));
      return;
    }
  }

  Snackbar.error(i18n.t('errors.wentWrong'));
};

const apiStatusErrorMap = new Map<number, string>();
apiStatusErrorMap.set(400, 'errors.wentWrong');
apiStatusErrorMap.set(404, 'errors.dataNotFound');

const exportCsvStatusErrorMap = new Map<number, string>();
exportCsvStatusErrorMap.set(400, 'errors.exportCsv');
exportCsvStatusErrorMap.set(404, 'errors.wentWrong');

export const curriedErrorHandler = _.curryRight(errorHandler);
export const apiErrorHandler = curriedErrorHandler(apiStatusErrorMap);
export const mutationErrorHandler = (err: AxiosError) => apiErrorHandler(err);
export const exportCsvApiErrorHandler = curriedErrorHandler(exportCsvStatusErrorMap);
export const exportCsvErrorHandler = (err: AxiosError) => exportCsvApiErrorHandler(err);
