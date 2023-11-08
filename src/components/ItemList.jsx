import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { items } from '../items';
import Item from './Item';

const ItemList = ({ handleDrawerToggle }) => {

  const containerStyles = {
    width: { sm: 'calc(100% - 240px)' },
    ml: { sm: '240px' },
  }

  return (
    <>
      <AppBar position="fixed" sx={containerStyles} color='slate400'>
        <Toolbar className='bg-gradient-to-r from-slate-500 to-slate-400'>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 1, display: { sm: 'none' } }}
          >
            <MenuIcon color="gold" />
          </IconButton>

          <div className='flex justify-center gap-10 w-full'>
            <div className='hidden md:flex gap-1 content-center pt-1'>
              <div style={{ paddingTop: 2 }}>
                <SearchIcon sx={{ fontSize: 22 }} color="gold" />
              </div>
              <Typography variant="h6" noWrap color="white">
                Find desired item
              </Typography>
            </div>

            <div className='grow w-30'>
              <TextField
                label="Search"
                variant="outlined"
                color="gold"
                size='small'
                InputProps={{ style: { color: "white" } }}
                InputLabelProps={{ style: { color: "gold" } }}
                fullWidth
              />
            </div>
          </div>
        </Toolbar>
      </AppBar >

      <Box component="main" sx={containerStyles}>
        <Toolbar />

        <div className='flex flex-wrap p-4 gap-4 justify-center'>
          {items.map((item) => (
            <Item key={item.name} item={item} />
          ))}
        </div>
      </Box>
    </>
  )
};

export default ItemList;