import React from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import HistoryIcon from '@mui/icons-material/History';

const UserControl = () => {
  const control = [
    {
      id: 1,
      name: "Suspend User",
      icon: <BlockIcon sx={{ fontSize: 50 }} />,
      action: "",
    },
    {
      id: 2,
      name: "Transaction History",
      icon: <HistoryIcon sx={{ fontSize: 50 }} />,
      action: "",
    },
    {
      id: 3,
      name: "Delete User",
      icon: <DeleteRoundedIcon sx={{ fontSize: 50 }} />,
      action: "",
    },
  ];
  return (
    <React.Fragment>
      {/* <ToastContainer /> */}
      <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
        {control.map((item) => (
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
           {item.icon}
            {item.name}
          </Button>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default UserControl;
