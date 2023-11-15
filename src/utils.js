import { PERCENTAGE_STATS } from './types';

export const formatStatValue = (type, value) => {
  if (PERCENTAGE_STATS.includes(type)) {
    return `${value}%`;
  }

  return value;
}