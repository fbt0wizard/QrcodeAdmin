import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tittle from "../../../components/Tittle"
import { useEffect } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  useEffect(() => {
    document.title = "Go Healthy || Settings"
  }, [])

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function Settings() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <React.Fragment>
      <Tittle>Setings</Tittle>
    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
      <AppBar position="static" sx={{bgcolor: "#5c9499"}}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          // variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="General Settings" {...a11yProps(0)} />
          <Tab label="Profile Settings" {...a11yProps(1)} />
          <Tab label="Account Settings" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          General Settings
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Profile Settings
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Account Settings
        </TabPanel>
      </SwipeableViews>
    </Box>
    </React.Fragment>
  );
}