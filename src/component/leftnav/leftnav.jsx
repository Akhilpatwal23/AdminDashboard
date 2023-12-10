import React, { useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const COMPO = ["Active Drive", "Student Profile", "Recruiter Profile", "Notice"];

const Leftnav = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          width: '220px',
          height: '100%',
          backgroundColor: '#2F2F2F',
          color: 'white',
          padding: '16px',
          marginTop: '100px',
          marginLeft: '10px',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '2%',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '16px' }}>
          WELCOME ADMIN
        </Typography>

        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          indicatorColor="primary"  // Change this color as needed
          textColor="white"
        >
          {COMPO.map((text, index) => (
            <Tab
              key={text}
              label={text}
              component={Link}
              to={`/${text.split(" ").join("").toLowerCase()}`}
              sx={{ marginBottom: '8px' }}
            />
          ))}
        </Tabs>
      </Box>
    </React.Fragment>
  );
}

export default Leftnav;
