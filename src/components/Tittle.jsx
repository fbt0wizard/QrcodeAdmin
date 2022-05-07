import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';

function Tittle(props) {
  return (
    <Typography component="h2" variant="h6" color="Teal" sx={{fontSize: 18}} gutterBottom>
      {props.children}
    </Typography>
  );
}

Tittle.propTypes = {
  children: PropTypes.node,
};

export default Tittle;