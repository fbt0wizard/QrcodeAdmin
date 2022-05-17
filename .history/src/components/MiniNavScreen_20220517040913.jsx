import React from 'react'
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const MiniNavScreen = (props) => {
  return (
    <Container
        maxWidth="lg"
        sx={{ borderRadius: 1, bgcolor: "#fff", boxShadow: 1, mb: 2 }}
      >
        <Box>
          <Button
            type="button"
            variant="contained"
            sx={{
              textTransform: "capitalize",
              mt: 2,
              mb: 2,
              bgcolor: "#5c9499",
              "&:hover": {
                bgcolor: "#387075",
              },
            }}
            onClick={() => props.navigate}
            startIcon={<KeyboardDoubleArrowLeftIcon />}
          >
            Go Back
          </Button>
        </Box>
      </Container>
  )
}

export default MiniNavScreen