import { useCallback, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Filters from './components/Filters';
import ItemList from './components/ItemList';
import { useMaterialTheme } from './hooks/useMaterialTheme';
import { useClearFilters } from './hooks/useClearFilters';
import { DEFAULT_FILTERS } from './types/filters';

function App() {
  const [isFilterOpened, setIsFilterOpened] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const { resetFilterValues } = useClearFilters();
  const { theme } = useMaterialTheme();

  const changeFilter = useCallback((type, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [type]: value }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS)
    resetFilterValues()
  }, [])

  const handleDrawerToggle = () => {
    setIsFilterOpened(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Filters
        filters={filters}
        isOpened={isFilterOpened}
        handleToggle={handleDrawerToggle}
        changeFilter={changeFilter}
        clearFilters={clearFilters}
      />
      <ItemList
        filters={filters}
        changeFilter={changeFilter}
        handleDrawerToggle={handleDrawerToggle}
      />
    </ThemeProvider>
  )
}

export default App
