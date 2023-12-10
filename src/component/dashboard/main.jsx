import React from 'react';


import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Typography,
  Grid,
} from '@mui/material';
import { Work, AccessTime, AssignmentInd, CheckBox, PendingActions } from '@mui/icons-material';

const CARDS = [
  { desc: "No Of Students Registered:",value:'4', iconComponent: AccessTime },
  { desc: "No Of Drive : ",value:'5', iconComponent: Work },
  { desc: "No Of Recruiters approved: ",value:'2', iconComponent: CheckBox },
  { desc: "Pending Student Confirmation:",value:'3', iconComponent: PendingActions },
  { desc: "Total Drive Application : ",value:'5' ,iconComponent: AssignmentInd },
  { desc: "Pending Recruiters Confirmation:",value:'1' ,iconComponent: PendingActions }
];

const Main = () => {
  return (
    <Box
    sx={{
      flex: 1,
      marginTop: '100px',
    
      marginLeft: '10px',
      marginRight: '10px',
      bgcolor: '#0F1924',
      height: 'auto', // Adjust the height as needed
      borderRadius: '10px',
      padding:'50px',
      display: 'flex',
      flexDirection: 'column',
      // Center content vertically
    }}
    >
      <Typography className='typo' style={{
          textAlign:'left',
          width: '100%',
          fontFamily: 'Poppins, sans-serif',
          color:'#E5EAF2',
          fontWeight:'900'
           }}  variant='h4' >
        Placement Cell Activity
      </Typography>

      {/* card */}
      <Grid container spacing={4} justifyContent="center"  sx={{  margin:'10px'}}>
        {CARDS.map((card, index) => {
          const IconComponent = card.iconComponent;

          return (
            <Grid item xs={12} sm={4} key={index}>
              <Card sx={{ maxWidth: 350, height: '100%' }}>
                <CardActionArea sx={{ height: '100%',
                      padding:'10px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center', // Center content vertically
                      alignItems: 'center', // Center content horizontally 
                    }}>
                  <IconButton sx={{ fontSize: '18px', marginTop:'6px'}}>
                    {IconComponent && <IconComponent />}
                  </IconButton>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.desc} {card.value}
                    </Typography>
                  
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Main;
