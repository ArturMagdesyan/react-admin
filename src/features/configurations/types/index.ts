export interface Configuration {
  key: string;
  value: string;
  lastUpdated: string;
  comment: string | null;
  title: string;
}

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface ConfigurationsFilterState
  extends Nullable<Omit<Configuration, 'comment' | 'lastUpdated'>> {
  truckId: number[];
}

export type ConfigurationsResponse = {
  total: number,
  content: Configuration[],
};
