import { useCallback, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';

import SelectFilter from './SelectFilter';
import { BOSSES, BOSS_TYPES, SOURCES, QUESTS } from '../types/itemQualities';
import { useClearFilters } from '../hooks/useClearFilters';

const SourceFilter = ({ filters, changeFilter }) => {
  const [source, setSource] = useState('');
  useClearFilters(() => setSource(''))

  const handleAlignment = useCallback((_, newSource) => {
    setSource(newSource);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      changeFilter('source', source)
      if (source === SOURCES.BOSS) {
        changeFilter('questName', '')
      }
      if (source === SOURCES.QUEST) {
        changeFilter('bossName', '')
        changeFilter('bossType', '')
      }
    }, 300)

    return () => clearTimeout(timerId)
  }, [source])

  const renderOptions = useCallback(() => {
    switch (source) {
      case SOURCES.BOSS:
        return (
          <>
            <SelectFilter
              key="Boss name"
              label="Boss name"
              options={BOSSES}
              type="bossName"
              changeFilter={changeFilter}
              value={filters.bossName}
            />
            <SelectFilter
              key="Boss type"
              label="Boss type"
              options={BOSS_TYPES}
              type="bossType"
              changeFilter={changeFilter}
              value={filters.bossType}
            />
          </>
        )
      case SOURCES.QUEST:
        return (
          <SelectFilter
            key="Quest name"
            label="Quest name"
            options={QUESTS}
            type="questName"
            changeFilter={changeFilter}
            value={filters.questName}
          />
        )
      case '':
      default:
        return null
    }
  }, [source, filters]);

  return (
    <>
      <div className='px-2'>
        <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>Source:</Typography>

        <ToggleButtonGroup
          value={source}
          exclusive
          onChange={handleAlignment}
          aria-label="Source selector"
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Typography sx={{ fontSize: 14, fontWeight: 'bold', pr: 1 }}>Boss</Typography>

          <ToggleButton value={SOURCES.BOSS} size="small" aria-label="boss">
            <CrisisAlertIcon />
          </ToggleButton>
          <ToggleButton value={SOURCES.QUEST} size="small" aria-label="quest">
            <ContactSupportIcon />
          </ToggleButton>

          <Typography sx={{ fontSize: 14, fontWeight: 'bold', pl: 1 }}>Quest</Typography>
        </ToggleButtonGroup>
      </div>

      {source && (
        <div className='flex flex-col gap-4 px-2 pt-4'>
          {renderOptions()}
        </div>
      )}

    </>
  )
}

export default SourceFilter