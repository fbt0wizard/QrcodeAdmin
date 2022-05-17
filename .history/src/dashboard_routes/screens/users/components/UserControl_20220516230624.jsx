import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import HistoryIcon from "@mui/icons-material/History";
import TransactionHistory from "./TransactionHistory";

const UserControl = () => {
  const [page, setPage] = useState("index");

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
      action: "transactionHistory",
    },
    {
      id: 3,
      name: "Delete User",
      icon: <DeleteRoundedIcon sx={{ fontSize: 50 }} />,
      action: "",
    },
  ];
  console.log(page);
  return (
    <React.Fragment>
      {page === "index" && (
        <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
          {control.map((item) => (
            <Button
              key={item.id}
              onClick={() => setPage(item.action)}
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
      )}
      {page === "transactionHistory" && (
        <TransactionHistory setpage={setPage} />
      )}
    </React.Fragment>
  );
};

export default UserControl;
