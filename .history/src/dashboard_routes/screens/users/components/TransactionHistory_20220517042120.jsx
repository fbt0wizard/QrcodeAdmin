import { Button, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import MiniNavScreen from '../../../../components/MiniNavScreen';

const TransactionHistory = (props) => {
  useEffect(() => {
    console.log(props.user)
  },[])
  return (
    <React.Fragment>
      <MiniNavScreen setPage={props.setPage}/>
      <Box sx={{width: "100%"}}>

      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory