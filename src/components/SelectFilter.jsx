import { useCallback } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const SelectFilter = ({ label, options, type, changeFilter, value }) => {
  const handleSelect = useCallback((event) => {
    changeFilter(type, event.target.value)
  }, []);

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={label} color='secondary'>{label}</InputLabel>
      <Select
        labelId={label}
        value={value}
        label={label}
        color='secondary'
        onChange={handleSelect}
      >
        <MenuItem value=""><em>None</em></MenuItem>
        {Object.values(options).map((item) => (
          <MenuItem value={item} key={item}>{item}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
};

export default SelectFilter;