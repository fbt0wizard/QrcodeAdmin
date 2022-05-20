import React from 'react'
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { useNavigate } from 'react-router-dom';

const MiniNavScreen = (props) => {
  const navigate = useNavigate()
  return (
    <Container
        maxWidth="sm"
        sx={{ borderRadius: 1, bgcolor: "#fff", boxShadow: 1, mb: 2 }}
      >
        <Box sx={{textAlign: "end"}}>
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
            onClick={() => props.main ? navigate(-1) : props.setPage("index")}
            startIcon={<KeyboardDoubleArrowLeftIcon />}
          >
            Go Back
          </Button>
        </Box>
      </Container>
  )
}

export default MiniNavScreen