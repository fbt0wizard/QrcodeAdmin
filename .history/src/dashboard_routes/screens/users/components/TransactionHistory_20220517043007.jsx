import { Button, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import MiniNavScreen from '../../../../components/MiniNavScreen';
import { axiosGet } from '../../../../functions/apiCalls';

const TransactionHistory = (props) => {
  const [data, setData] = useState([])
  useEffect(() => {
    axiosGet('points', {user: props.user.uuid}).then((res) => {
      console.log(res.data)
      switch(res.data.status) {
        case 200:
          setData(res.data.data)
          break;
          default: 
          console.log(res.datastatus)
      }
    })
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