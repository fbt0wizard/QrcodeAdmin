import { Button, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import MiniNavScreen from '../../../../components/MiniNavScreen';

const TransactionHistory = (props) => {
  return (
    <React.Fragment>
      <MiniNavScreen setPage={props.setPage}/>
      <Box sx={{width: "100%"}}>
        
      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory