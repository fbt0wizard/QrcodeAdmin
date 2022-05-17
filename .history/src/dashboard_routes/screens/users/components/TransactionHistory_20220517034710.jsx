import { Button, Toolbar } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const TransactionHistory = (props) => {
  return (
    <React.Fragment>
      <Box>
        <Toolbar>
          <Button
          onClick={() => props.setPage("index")}
          variant="contained"
          startIcon={<FilterAltIcon />}
          sx={{
            bgcolor: "#5c9499",
            "&:hover": {
              bgcolor: "#387075",
            },
          }}
          >
            Go Back
          </Button>
        </Toolbar>
      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory