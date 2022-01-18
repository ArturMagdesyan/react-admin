import { UserRole } from '../../../common/enums';
import type { TableSortType } from '../../../common/types';
import { UserStatus } from '../enums';

type Nullable<T> = { [K in keyof T]: T[K] | null };

export interface Settings {
  enabled: boolean;
  id: number;
  name: string;
  phone: string;
  email: string;
  registrationDate: string;
  roles: UserRole[];
  state: UserStatus;
}

export interface SettingsResponse {
  content: Settings[];
  total: number;
}

type OmitSettingsKeys =
  | 'id'
  | 'registrationDate'
  | 'state'
  | 'enabled';

export interface SettingsFilterState
  extends Nullable<Omit<Settings, OmitSettingsKeys>> {
  page: number;
  size: number;
  orderType: TableSortType | null;
  orderColumn: string;
  states: [];
}
