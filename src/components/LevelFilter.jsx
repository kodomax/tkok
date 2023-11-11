import { useCallback, useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

import { MIN_LEVEL, MAX_LEVEL } from '../items';
import { useClearFilters } from '../hooks/useClearFilters';

const LevelFilter = ({ changeFilter }) => {
  const [level, setLevel] = useState([MIN_LEVEL, MAX_LEVEL]);
  useClearFilters(() => setLevel([MIN_LEVEL, MAX_LEVEL]))

  useEffect(() => {
    const timerId = setTimeout(() => {
      changeFilter('level', level)
    }, 300)

    return () => clearTimeout(timerId)
  }, [level])

  const handleLevelChange = useCallback((_, newValue) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    setLevel(newValue)
  }, []);


  return (
    <Slider
      getAriaLabel={() => 'Level filter'}
      value={level}
      onChange={handleLevelChange}
      valueLabelDisplay="auto"
      min={MIN_LEVEL}
      max={MAX_LEVEL}
    />
  )
}

export default LevelFilter;