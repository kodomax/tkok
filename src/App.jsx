
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Filters from './components/Filters';
import ItemList from './components/ItemList';

const theme = createTheme({
  palette: {
    gold: {
      main: 'gold'
    },
    slate400: {
      main: '#94a3b8'
    },
    primary: {
      main: '#FFD700'
    },
    secondary: {
      main: '#000000',
    },
  },
});

function App() {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const handleDrawerToggle = () => {
    setIsFilterOpened(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <Filters isOpened={isFilterOpened} handleToggle={handleDrawerToggle} />
      <ItemList handleDrawerToggle={handleDrawerToggle} />
    </ThemeProvider>
  )
}

export default App
