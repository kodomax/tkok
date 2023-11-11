
import { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
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
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#ff0000 #2b2b2b",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#f5f5f5",
            width: 10
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#FFD700",
            minHeight: 24,
            border: "1px solid #94a3b8",
          },
          "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
            backgroundColor: "#959595",
          },
          "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#ffbf00",
          },
          "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
            backgroundColor: "#2b2b2b",
          },
        },
      },
    },
  }
});

function App() {
  const [isFilterOpened, setIsFilterOpened] = useState(false);

  const handleDrawerToggle = () => {
    setIsFilterOpened(prev => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Filters isOpened={isFilterOpened} handleToggle={handleDrawerToggle} />
      <ItemList handleDrawerToggle={handleDrawerToggle} />
    </ThemeProvider>
  )
}

export default App
