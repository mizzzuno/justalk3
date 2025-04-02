import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DehazeIcon from '@mui/icons-material/Dehaze';

export default function IconButtons({ onClick }) {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton aria-label="Dehaze" onClick={onClick}>
        <DehazeIcon />
      </IconButton>
    </Stack>
  );
}