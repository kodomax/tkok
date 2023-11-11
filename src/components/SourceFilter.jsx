import { useCallback, useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';

import { BOSSES, BOSS_TYPES, SOURCES, QUESTS } from '../types';
import SelectFilter from './SelectFilter';
import { useClearFilters } from '../hooks/useClearFilters';

const SourceFilter = ({ filters, changeFilter }) => {
  const [radioValue, setRadioValue] = useState('')
  useClearFilters(() => setRadioValue(''))

  const handleSourceChange = useCallback((event) => {
    setRadioValue(event.target.value)
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => {
      changeFilter('source', radioValue)
      if (radioValue === SOURCES.BOSS) {
        changeFilter('questName', '')
      }
      if (radioValue === SOURCES.QUEST) {
        changeFilter('bossName', '')
        changeFilter('bossType', '')
      }
    }, 300)

    return () => clearTimeout(timerId)
  }, [radioValue])

  const renderOptions = useCallback(() => {
    switch (radioValue) {
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
  }, [radioValue, filters]);

  return (
    <>
      <div className='px-2'>
        <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>Source:</Typography>
        <FormControl >
          <RadioGroup value={radioValue} onChange={handleSourceChange} name="source">
            {Object.values(SOURCES).map((item) => (
              <FormControlLabel
                value={item}
                label={item}
                key={item}
                control={<Radio color='primary' size='small' />} />
            ))}
          </RadioGroup>
        </FormControl>
      </div>

      <div className='flex flex-col gap-4 px-2'>
        {renderOptions()}
      </div>
    </>
  )
}

export default SourceFilter