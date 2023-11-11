import { MAX_LEVEL, MIN_LEVEL } from './items';

const DEFAULT_FILTERS = {
  name: '',
  level: [MIN_LEVEL, MAX_LEVEL],
}

export const getDefaultFilters = () => ({
  ...DEFAULT_FILTERS,
  level: [...DEFAULT_FILTERS.level]
})