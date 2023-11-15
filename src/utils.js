import { PERCENTAGE_STATS, SOURCES } from './types/itemQualities';

export const formatStatValue = (type, value) => {
  if (PERCENTAGE_STATS.includes(type)) {
    return `${value}%`;
  }

  return value;
};

export const filterItems = (filters, items) =>
  Object.entries(filters).reduce((acc, [filterName, filterValue]) => {
    if (!filterValue) return acc;

    if (filterName === 'level') {
      return acc.filter(item => item.level >= filterValue[0] && item.level <= filterValue[1]);
    }
    if (filterName === 'name') {
      return acc.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    if (filterName === 'slot') {
      return acc.filter(item => item.slot === filterValue)
    }
    if (filterName === 'type') {
      return acc.filter(item => item.type === filterValue)
    }
    if (filterName === 'stat') {
      return acc.filter(item => Object.keys(item.stats).includes(filterValue) && item.stats[filterValue] > 0)
    }
    if (filterName === 'hero') {
      return acc.filter(item => Object.keys(item?.special || []).includes(filterValue))
    }
    if (filterName === 'source') {
      return acc.filter(item => item.source.type === filterValue)
    }
    if (filterName === 'bossName') {
      return acc.filter(item => item.source.id === filterValue)
    }
    if (filterName === 'bossType') {
      return acc.filter(item => item.source.kill === filterValue)
    }
    if (filterName === 'questName') {
      return acc.filter(item => item.source.id === filterValue && item.source.type === SOURCES.QUEST)
    }
  }, items);