import { PERCENTAGE_STATS, SOURCES, TYPES } from './types/itemQualities';

export const formatStatValue = (type, value) => {
  if (PERCENTAGE_STATS.includes(type)) {
    return `${value}%`;
  }

  return value;
};

export const filterItems = (filters, items, wishlistedItems) =>
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
      const mithrilAppliedTypes = [TYPES.MAIL, TYPES.LEATHER, TYPES.CLOTH];
      return acc.filter(item => {
        if (mithrilAppliedTypes.includes(filterValue)) {
          return item.type === filterValue || item.type === TYPES.MITHRIL;
        }

        return item.type === filterValue;
      })
    }
    if (filterName === 'stat') {
      return acc.filter(item => Object.keys(item.stats).includes(filterValue) && item.stats[filterValue] > 0)
    }
    if (filterName === 'hero') {
      return acc.filter(item => Object.keys(item?.special || []).includes(filterValue) || item?.restriction === filterValue)
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
    if (filterName === 'wishlist') {
      return acc.filter(item => wishlistedItems.includes(item.name))
    }
  }, items);

export const getWishlistFromStorage = () => {
  return JSON.parse(localStorage.getItem('wishlist')) || []
};

export const writeWishlistToStorage = (wishlist) => {
  localStorage.setItem('wishlist', JSON.stringify(wishlist))
};