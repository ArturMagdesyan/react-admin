import axios from 'axios';
import { QueryClient } from 'react-query';
import config from '../config';

axios.defaults.baseURL = config.api.baseUrl;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export default queryClient;
