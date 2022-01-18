const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

export interface Config {
  isDevelopment: boolean;
  isProduction: boolean;
  i18next: {
    debug: boolean;
  };
  api: {
    baseUrl: string;
  };
}

const config: Config = {
  isDevelopment,
  isProduction,
  i18next: {
    debug: isDevelopment,
  },
  api: {
    baseUrl: process.env.REACT_APP_API_URL,
  },
};

export default config;
