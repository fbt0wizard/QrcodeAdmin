import { Button, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MiniNavScreen from '../../../../components/MiniNavScreen';

const TransactionHistory = (props) => {
  return (
    <React.Fragment>
      <MiniNavScreen navigate={props.setPage("index")}/>
      <Box sx={{width: "100%"}}>
        
      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory