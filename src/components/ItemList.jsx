import { useMemo, useDeferredValue, useState, useEffect, useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import Item from './Item';
import { items } from '../items';
import { useClearFilters } from '../hooks/useClearFilters';
import { SOURCES } from '../types';

const ItemList = ({ handleDrawerToggle, filters, changeFilter }) => {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDeferredValue(query);
  useClearFilters(() => setQuery(''))

  useEffect(() => {
    if (debouncedQuery === '') {
      changeFilter('name', '')
      return
    }

    const timerId = setTimeout(() => {
      changeFilter('name', debouncedQuery)
    }, 300)

    return () => clearTimeout(timerId)
  }, [debouncedQuery])

  const filteredItems = useMemo(() => Object.entries(filters).reduce((acc, [filterName, filterValue]) => {
    if (!filterValue) return acc;

    if (filterName === 'level') {
      return acc.filter(item => item.level >= filterValue[0] && item.level <= filterValue[1]);
    }
    if (filterName === 'name') {
      return acc.filter(item => item.name.toLowerCase().includes(filterValue.toLowerCase()))
    }
    if (filterName === 'slot') {
      return acc.filter(item => item.slot === filterValue)
    }
    if (filterName === 'type') {
      return acc.filter(item => item.type === filterValue)
    }
    if (filterName === 'stat') {
      return acc.filter(item => Object.keys(item.stats).includes(filterValue) && item.stats[filterValue] > 0)
    }
    if (filterName === 'hero') {
      return acc.filter(item => Object.keys(item?.special || []).includes(filterValue))
    }
    if (filterName === 'source') {
      return acc.filter(item => item.source.type === filterValue)
    }
    if (filterName === 'bossName') {
      return acc.filter(item => item.source.id === filterValue)
    }
    if (filterName === 'bossType') {
      return acc.filter(item => item.source.kill === filterValue)
    }
    if (filterName === 'questName') {
      return acc.filter(item => item.source.id === filterValue && item.source.type === SOURCES.QUEST)
    }
  }, items), [filters])

  const handleNameInput = useCallback((event) => {
    setQuery(event.target.value)
  }, [])

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
                value={query}
                onChange={handleNameInput}
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

        <Box component="div" sx={{ padding: 3 }}>
          {filteredItems.length === 0 ? (
            <Typography sx={{ fontWeight: 'bold', color: 'gray', fontSize: 25, py: 10 }}>
              No matches found!
            </Typography>
          ) : (
            <Grid container spacing={3} columns={12}>
              {filteredItems.map((item) => (
                <Grid xs={12} sm={6} md={4} key={item.name} style={{ minWidth: 300, flexGrow: 1 }}>
                  <Item item={item} />
                </Grid>
              ))}

              {[...Array(2)].map((_, i) => (
                <Grid key={`filler${i}`} style={{ flexGrow: 1, padding: 0, minWidth: 300 }} sx={{
                  flexBasis: { md: '33%', sm: '50%', xs: 0 }
                }} />
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </>
  )
};

export default ItemList;