import React from 'react';
import { Box } from '@mui/material';
import { Grid } from 'react-loader-spinner';

export const LoadingSpinner: React.FC = () => {
  return (
    <Box
      sx={{
        zIndex: 9999,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Box>
  );
};
