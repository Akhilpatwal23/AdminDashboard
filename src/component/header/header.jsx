import React, { useState } from 'react';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AppBar, Toolbar, Tabs, Tab, Button, useMediaQuery, useTheme } from '@mui/material';
import DrawerComp from '../DrawerComp';
import { Link, useLocation } from 'react-router-dom';

const PAGES = ['Dashboard', 'Placed Student', 'Notice'];

const Header = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar sx={{ background: '#191919', top: '0', width: '100%' }}>
        <Toolbar>
          <DashboardIcon />
          {isMatch ? (
            <>
              <Tabs sx={{ marginLeft: '25px' }} textColor="inherit" value={0} indicatorColor="primary">
                <Tab label="admin" />
              </Tabs>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ marginLeft: '25px', paddingLeft: '2%' }}
                textColor="inherit"
                value={0}
                indicatorColor="primary"
              >
                <Tab sx={{ fontSize: '1rem' }} label="admin" />
              </Tabs>
              <Tabs
                    sx={{ marginLeft: 'auto' }}
                    textColor="inherit"
                    value={value}
                    onChange={handleChange}
                    TabIndicatorProps={{ sx: { backgroundColor: 'white' } }}
                >
                {PAGES.map((page, index) => (
                    <Tab
                    key={index}
                    label={page}
                    component={Link}
                    to={`/${page.split(" ").join("").toLowerCase()}`}
                    sx={{ margin: '8px' }}
                    selected={location.pathname === `/${page.split(" ").join("").toLowerCase()}`}
                    />
                ))}
            </Tabs>
              <Button sx={{ bgcolor: '#919191', marginLeft: '15px' }} variant="contained">
                Log Out
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
