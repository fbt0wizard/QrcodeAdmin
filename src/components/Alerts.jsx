import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export const AlertSuccess = ({alert, type}) => {

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity={type}>{alert}</Alert>
    </Stack>
  );
}


export const AlertForDelete = ({alert, type}) => {

  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert variant="filled" severity={type}>{alert}</Alert>
    </Stack>
  );
}

