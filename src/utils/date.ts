import { CZECH_HOLIDAYS } from './constants';
import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  isWeekend,
  startOfMonth,
} from 'date-fns';
import { cs } from 'date-fns/locale';

const formatDate = (date: Date) => format(date, 'yyyy-MM-dd');

const getEasterSunday = (year: number): Date => {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;

  return new Date(year, month, day);
};

export const getCzechPublicHolidays = (year: number) => {
  const fixedHolidayKeys = CZECH_HOLIDAYS.map(([month, day]) =>
    formatDate(new Date(year, month - 1, day)),
  );

  const easterSunday = getEasterSunday(year);
  const movableHolidayKeys = [
    formatDate(addDays(easterSunday, -2)),
    formatDate(addDays(easterSunday, 1)),
  ];

  return new Set([...fixedHolidayKeys, ...movableHolidayKeys]);
};

export const getWeekdaysInMonth = (year: number, month: number) => {
  const baseDate = new Date(year, month, 1);
  const start = startOfMonth(baseDate);
  const end = endOfMonth(baseDate);

  const days = eachDayOfInterval({ start, end });

  return days
    .filter((date) => !isWeekend(date))
    .map((date) => ({
      key: formatDate(date),
      label: format(date, 'EEEEEE dd.MM', { locale: cs }),
    }));
};
