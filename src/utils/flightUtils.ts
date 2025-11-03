import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export const formatDateTime = (date: string) => {
  return dayjs(date).format('MMM D, YYYY h:mm A');
};

export const getStatusColor = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'on time':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
    case 'delayed':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-white/80';
  }
};

export const statusKey = (status: string): 'on' | 'delayed' | 'cancelled' | 'unknown' => {
  const s = status.toLowerCase();
  if (s === 'on time') return 'on';
  if (s === 'delayed') return 'delayed';
  if (s === 'cancelled') return 'cancelled';
  return 'unknown';
};

export const calculateDelay = (scheduled: string, actual?: string): number => {
  if (!actual) return 0;
  return dayjs(actual).diff(dayjs(scheduled), 'minute');
};