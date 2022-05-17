import { Toolbar } from '@mui/material'
import React from 'react'

const TransactionHistory = () => {
  return (
    <React.Fragment>
      <Box>
        <Toolbar>
          <Button
          variant="contained"
          >
            Go Back
          </Button>
        </Toolbar>
      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory