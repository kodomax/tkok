import { useCallback, useState } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import { FILTERS } from '../types/filters'
import { useClearFilters } from '../hooks/useClearFilters';

const WishlistFilter = ({ changeFilter }) => {
  const [isWishlistActive, setIsWishlistActive] = useState(false);
  useClearFilters(() => setIsWishlistActive(false))

  const toggleWishlist = useCallback(() => {
    setIsWishlistActive(prev => {
      changeFilter(FILTERS.WISHLIST, !prev)
      return !prev;
    })
  }, [])

  return (
    <FormGroup >
      <FormControlLabel
        checked={isWishlistActive}
        onChange={toggleWishlist}
        control={<Checkbox />}
        label="Show wishlisted only"
        sx={{ fontWeight: 'bold' }}
      />
    </FormGroup>
  )
};

export default WishlistFilter;