import { MAX_LEVEL, MIN_LEVEL } from '../data/items'

export const FILTERS = {
  LEVEL: 'level',
  NAME: 'name',
  SLOT: 'slot',
  TYPE: 'type',
  STAT: 'stat',
  HERO: 'hero',
  SOURCE: 'source',
  BOSS_NAME: 'bossName',
  BOSS_TYPE: 'bossType',
  QUEST_NAME: 'questName',
}

export const DEFAULT_FILTERS = {
  [FILTERS.LEVEL]: [MIN_LEVEL, MAX_LEVEL],
  [FILTERS.NAME]: '',
  [FILTERS.SLOT]: '',
  [FILTERS.TYPE]: '',
  [FILTERS.STAT]: '',
  [FILTERS.HERO]: '',
  [FILTERS.SOURCE]: '',
  [FILTERS.BOSS_NAME]: '',
  [FILTERS.BOSS_TYPE]: '',
  [FILTERS.QUEST_NAME]: '',
}