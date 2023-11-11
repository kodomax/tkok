import { useCallback, useState, memo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { grey } from '@mui/material/colors';

import { QUALITIES } from '../types';

const Item = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHover = useCallback(() => setIsHovered(prev => !prev), [])

  const getQualityColor = useCallback(() => {
    switch (item.quality) {
      case QUALITIES.ENCHANTED:
        return '#ffff00'
      case QUALITIES.EPIC:
        return '#ff66ff'
      case QUALITIES.RELIC:
        return '#ffcc3a'
    }
  }, [])

  return (
    <Fade in easing={{ enter: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
      <Card
        raised={isHovered}
        onMouseOver={toggleHover}
        onMouseOut={toggleHover}
        sx={{ backgroundColor: grey[100] }}
      >
        <CardHeader title={item.name} titleTypographyProps={{ fontSize: 16, fontWeight: 'bold' }} />

        <Divider />

        <CardContent sx={{ padding: '8px 20px', textAlign: 'start' }}>
          <Box sx={{ overflow: "hidden", overflowY: "scroll", height: 300 }}>
            {item.desc && (
              <Typography sx={{ fontSize: 14, fontStyle: 'italic', my: 1.5, textAlign: 'center' }} color="text.secondary" >
                {item.desc}
              </Typography>
            )}

            <Typography sx={{ fontSize: 14 }}>
              <b>Level:</b> {item.level}
            </Typography>

            <Box display="flex" gap={0.5} alignItems="center">
              <Typography sx={{ fontSize: 14 }}>
                <b>Quality:</b>
              </Typography>
              <Chip
                label={item.quality}
                variant='outlined'
                sx={{ color: 'black', height: 20, borderWidth: 3, fontStyle: 'italic', borderColor: getQualityColor(), boxShadow: '2px 2px 1px 1px rgba(0,0,0,0.1)' }}
              />
            </Box>

            <Typography sx={{ fontSize: 14 }}>
              <b>Slot:</b> {item.slot}
            </Typography>

            <Typography sx={{ fontSize: 14 }}>
              <b>Type:</b> {item.type}
            </Typography>

            <Typography sx={{ fontSize: 14, py: 1 }}>
              <b>How to obtain:</b> {item.source.id}
              {item.source?.kill && ` (${item.source?.kill})`}
            </Typography>

            <Typography sx={{ fontSize: 14 }}>
              <b>Stats:</b>
            </Typography>

            {Object.entries(item.stats).map(([statName, statValue]) => (
              <Typography sx={{ fontSize: 14, pl: 1 }} key={`${item.name}_${statName}`}>
                {statName}: {statValue}
              </Typography>
            ))}

            {item?.special && (
              <>
                <Typography sx={{ fontSize: 14, pt: 1 }}>
                  <b>Special bonuses:</b>
                </Typography>

                {Object.entries(item.special).map(([specialName, specialDesc]) => (
                  <Typography sx={{ fontSize: 14, px: 1, py: 0.5 }} key={`${item.name}_${specialName}`}>
                    <b>{specialName}:</b> {specialDesc}
                  </Typography>
                ))}
              </>
            )}
          </Box>
        </CardContent>

        <CardActions>
          <Button
            size="small"
            color='secondary'
            fullWidth
            sx={{ fontWeight: 'bold' }}
          >
            Add to wishlist
          </Button>
        </CardActions>
      </Card>
    </Fade>
  )
};

export default memo(Item);