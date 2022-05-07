import React from 'react'
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from '@mui/icons-material/Block';
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

const UserControl = () => {
    // const [modal, setModal] = useState(false);
  return (
    <React.Fragment>
        {/* <ToastContainer /> */}
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
        <Button
        //   onClick={() => setModal(true)}
          type="button"
          variant="contained"
          sx={{
            m: 2,
            display: "grid",
            lineHeight: "17px",
            placeItems: "center",
            width: 125,
            textTransform: "capitalize",
            bgcolor: "#5c9499",
            "&:hover": {
              bgcolor: "#387075",
            },
          }}
        >
          <BlockIcon sx={{ fontSize: 50 }} />
          Suspend User
        </Button>

        <Button
        //   onClick={() => setModal(true)}
          type="button"
          variant="contained"
          sx={{
            m: 2,
            display: "grid",
            lineHeight: "17px",
            placeItems: "center",
            width: 125,
            textTransform: "capitalize",
            bgcolor: "#5c9499",
            "&:hover": {
              bgcolor: "#387075",
            },
          }}
        >
          <DeleteRoundedIcon sx={{ fontSize: 50 }} />
          Delete User
        </Button>
        </Box>
    </React.Fragment>
  )
}

export default UserControl