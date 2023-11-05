
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Boss = ({ name, info, items }) => {


  return (
    <Accordion className='p-2'>
      <AccordionSummary>
        <Typography component='div'>
          <Box fontWeight='bold' display='inline'>
            {name}
          </Box>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {info.map((infoNode, i) => (
          <Typography key={infoNode + i} className='text-left'>
            {infoNode}
          </Typography>
        ))}

        {items.map((item, i) => (
          <Accordion key={item.NAME + i} className='my-4'>
            <AccordionSummary>
              <Typography >{item.NAME}</Typography>
              <Typography className='absolute right-4'>{`${item.TYPE}, level ${item.LEVEL}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {item.DESC && (
                <Typography className='text-left italic pb-2'>{item.DESC}</Typography>
              )}

              {item?.stats && Object.entries(item.stats).map((stat) => (
                <Typography key={item.NAME + stat[0]} className='text-left'>{`${stat[0]}: ${stat[1]}`}</Typography>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}

      </AccordionDetails>
    </Accordion>
  )
}

export default Boss