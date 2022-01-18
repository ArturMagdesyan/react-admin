import {
  QueryFunctionContext,
  useQuery,
} from 'react-query';
import i18n from 'i18next';
import axios from '../../../app/axios';
import { ConfigurationsResponse } from '../types';
import { apiErrorHandler } from '../../../utils/errorHandler';

const transformResponse = (data: ConfigurationsResponse): ConfigurationsResponse => (
  {
    total: data.total,
    content: data.content.map((configuration) => (
      {
        ...configuration,
        title: i18n.t(`configurations.${configuration.key}`),
      }
    )),
  }
);

export const getConfigurations = async ({
  queryKey,
}: QueryFunctionContext): Promise<ConfigurationsResponse> => {
  const [, queryParams] = queryKey;
  const { truckId } = queryParams as { truckId: number };

  const response = await axios.get<ConfigurationsResponse, ConfigurationsResponse>(`configurations?truckId=${truckId}`);

  return transformResponse(response);
};

export const useConfigurations = (truckId: number) => useQuery(
  ['configurations', { truckId }],
  getConfigurations,
  {
    keepPreviousData: true,
    onError: apiErrorHandler,
  },
);
