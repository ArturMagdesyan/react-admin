import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import {
  StatisticIcon,
  OrderIcon,
  NotificationIcon,
  StarIcon,
  UsersIcon,
  SettingsIcon,
  ConfigurationIcon,
  DocumentIcon,
  TransactionIcon,
  AlarmIcon,
} from '../../components/Icons';

export type NavigationItem = {
  title: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
};

const navigationData: NavigationItem[] = [
  {
    title: 'statistics',
    route: '/statistics',
    icon: StatisticIcon,
  },
  {
    title: 'orders',
    route: '/orders',
    icon: OrderIcon,
  },
  {
    title: 'alarms',
    route: '/alarms',
    icon: AlarmIcon,
  },
  {
    title: 'users',
    route: '/users',
    icon: UsersIcon,
  },
  {
    title: 'transactions',
    route: '/transactions',
    icon: TransactionIcon,
  },
  {
    title: 'documents',
    route: '/documents',
    icon: DocumentIcon,
  },
  {
    title: 'configurations',
    route: '/configurations',
    icon: ConfigurationIcon,
  },
  {
    title: 'settings',
    route: '/settings',
    icon: SettingsIcon,
  },
  {
    title: 'notifications',
    route: '/notifications',
    icon: NotificationIcon,
  },
  {
    title: 'ratingsAndReviews',
    route: '/reviews',
    icon: StarIcon,
  },
];

export default navigationData;
