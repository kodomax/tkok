import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';

import { SOURCES, BOSSES, BOSS_TYPES, TYPES, SLOTS, HEROES, STATS } from '../types';
import SelectFilter from './SelectFilter';

const Filters = ({ isOpened, handleToggle }) => {

  const drawer = (
    <div className='h-full bg-slate-100'>
      <Toolbar className='bg-slate-500' sx={{ boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)' }}>
        <div className='flex gap-1 content-center justify-center pr-7 w-full'>
          <div style={{ paddingTop: 2 }}>
            <FilterListIcon sx={{ fontSize: 22 }} color="gold" />
          </div>
          <Typography variant="h6" noWrap color="white">
            Filters
          </Typography>
        </div>
      </Toolbar>

      <div className='p-4 w-full'>
        <Button variant="contained" color='gold' fullWidth>
          Clear filters
        </Button>
      </div>

      <Divider />

      <div className='p-2 w-full'>
        <div className='px-2'>
          <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>Source:</Typography>
          <FormControl >
            <RadioGroup
              defaultValue=""
              name="radio-buttons-group"
            >
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

        <div className='flex flex-col gap-4 pb-2 px-2'>
          <SelectFilter label="Boss name" options={BOSSES} />
          <SelectFilter label="Boss type" options={BOSS_TYPES} />
        </div>
      </div>

      <Divider />

      <div className='py-2 px-2'>
        <Typography sx={{ fontSize: 17, fontWeight: 'bold' }}>Item details:</Typography>
        <div className='flex flex-col gap-4 p-2'>
          <SelectFilter label="Slot" options={SLOTS} />
          <SelectFilter label="Item type" options={TYPES} />
          <SelectFilter label="Stat" options={STATS} />
          <SelectFilter label="Hero special" options={HEROES} />
        </div>
      </div>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="nav"
        sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={isOpened}
          onClose={handleToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Filters