import { MAX_LEVEL, MIN_LEVEL } from './items';

const DEFAULT_FILTERS = {
  level: [MIN_LEVEL, MAX_LEVEL],
  name: '',
  slot: '',
  type: '',
  stat: '',
  hero: '',
  source: '',
  bossName: '',
  bossType: '',
  questName: '',
}

export const getDefaultFilters = () => ({
  ...DEFAULT_FILTERS,
  level: [...DEFAULT_FILTERS.level]
})