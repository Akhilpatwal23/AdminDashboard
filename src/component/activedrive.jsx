import React from 'react'
import {  Box,TableContainer,Paper} from '@mui/material';

import Drivetable from './drivetable';


const Activedrive = () => {
  return (
    <React.Fragment>
    <Box
    sx={{
      flex: 1,
      marginTop: '80px',
    
      marginLeft: '10px',
      marginRight: '10px',
      bgcolor: '#0F1924',
      height: 'auto', // Adjust the height as needed
      borderRadius: '10px',
      maxHeight:'800px',
      padding:'45px',
      display: 'flex',
      flexDirection: 'column',
      // Center content vertically
    }}
    >
      <Drivetable/>

      </Box>
    
   </React.Fragment>
  ) 
}

export default Activedrive;