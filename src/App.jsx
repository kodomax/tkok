
import { useEffect, useState } from 'react'
import { parseRawItems } from './helpers'
import './App.css'

import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Boss from './Boss';


function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const parsedData = await parseRawItems();
      setData(parsedData)
    })()
  }, [])

  return (
    <>
      <CssBaseline />

      <AppBar position="sticky">
        <Toolbar className='flex justify-center bg-gradient-to-r from-gray-500 to-gray-600'>
          <Typography variant="h6" color="inherit" noWrap>
            pososal?
          </Typography>
        </Toolbar>
      </AppBar>

      <main className='flex flex-col gap-8 my-8'>
        {data.map((boss, i) => (
          <Boss name={boss.name} info={boss.info} items={boss.items} key={boss.name} />
        ))}
      </main>
    </>
  )
}

export default App
