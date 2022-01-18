import { useState } from 'react';
import { Theme } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';

const styles = {
  height: '30px',
  color: (theme: Theme) => theme.colors.manatee,
  '& .MuiSelect-icon': {
    marginBottom: (theme: Theme) => theme.spacing(-1.2),
    fontSize: '1em',
  },
  '& .MuiTypography-root': {
    top: (theme: Theme) => theme.spacing(0.75),
    font: 'normal normal normal 13px/13px Roboto',
    textAlign: 'left',
    letterSpacing: 0,
  },
  '&:after': {
    borderBottom: '1px solid rgba(41, 170, 255, 1)',
  },
  '&:hover': {
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(41, 170, 255, 1)',
    },
  },
};

interface Props {
  label: string;
  items: any;
  onChange: (e: SelectChangeEvent<string[]>) => void;
}

export const TableSelectInput = ({
  label,
  items,
  onChange,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof selectedValue>) => {
    const { target: { value } } = event;
    setSelectedValue(typeof value === 'string' ? value.split(',') : value);
    onChange(event);
  };

  return (
    <Select
      sx={styles}
      variant="standard"
      multiple
      displayEmpty
      onChange={handleChange}
      value={selectedValue}
      renderValue={() => (
        <ListItemText primary={label} />
      )}
    >
      {items.map((item: any) => (
        <MenuItem key={item.key} value={item.key}>
          <Checkbox checked={selectedValue.indexOf(item.key) > -1} />
          <ListItemText primary={item.value} />
        </MenuItem>
      ))}
    </Select>
  );
};
