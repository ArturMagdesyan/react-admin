import {
  format,
  endOfDay,
  startOfDay,
  startOfMonth,
  endOfMonth,
  formatDistance,
} from 'date-fns';
import i18next from 'i18next';
import { enUS as en, ru } from 'date-fns/locale';

const dateFormat = 'dd/MM/yyyy HH:mm';
const fullMonthDateFormat = 'dd MMMM HH:mm';
const locales: Record<string, Locale> = { en, ru };
const locale = locales[i18next.language];

export const getTodayStartDate = (): string => (
  format(startOfDay(new Date()), dateFormat)
);

export const getTodayEndDate = (): string => (
  format(endOfDay(new Date()), dateFormat)
);

export const getMonthStartDate = (): string => (
  format(startOfMonth(new Date()), dateFormat)
);

export const getMonthEndDate = (): string => (
  format(endOfMonth(new Date()), dateFormat)
);

export const dateFormatted = (date: Date): string => (
  format(date, dateFormat)
);

export const distanceFromNowFormatted = (date: number) => (
  formatDistance(
    date,
    Date.now(),
    { locale, addSuffix: true },
  )
);

export const fullMonthDateFormatted = (date: number) => (
  format(new Date(date), fullMonthDateFormat, { locale })
);
