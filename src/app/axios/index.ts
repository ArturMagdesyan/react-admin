import Axios, {
  AxiosRequestConfig,
} from 'axios';
import i18next from 'i18next';
import { Snackbar } from '../../features/notistack';
import appConfig from '../config';
import storage from '../../utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  config.headers.Accept = 'application/json';
  config.withCredentials = true;
  return config;
}

const axios = Axios.create({
  baseURL: appConfig.api.baseUrl,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status || undefined;

    if (!status || status >= 500) {
      Snackbar.error(i18next.t('errors.serverError'));

      return null;
    }

    if (status === 401) {
      return null;
    }

    return Promise.reject(error);
  },
);

export default axios;
