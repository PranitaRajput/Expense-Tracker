import React from 'react';
import { Paper } from '@mui/material';

const SectionWrapper = ({ children }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        backgroundColor: '#3b3b3b',
        color: '#ffffff',
        padding: 2,
        borderRadius: 2,
        textAlign: 'center',
        justifyContent:'center',
        height: '100%',
      }}
    >
      {children}
    </Paper>
  );
};

export default SectionWrapper;

