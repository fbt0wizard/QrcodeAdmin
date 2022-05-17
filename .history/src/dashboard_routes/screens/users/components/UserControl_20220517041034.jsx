import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import HistoryIcon from "@mui/icons-material/History";
import TransactionHistory from "./TransactionHistory";
import MiniNavScreen from "../../../../components/MiniNavScreen";
import { useNavigate } from "react-router-dom";

const UserControl = () => {
  const navigate = useNavigate()
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
  return (
    <React.Fragment>
      {page === "index" && (
        <Box>
          <MiniNavScreen  goBack={navigate(-1)}/>
          <Box
            sx={{
              width: "max-content",
              display: "flex",
              flexWrap: "wrap",
              p: 2,
              boxShadow: 1,
              background: "#fff",
              borderRadius: 2,
              mt: 4
            }}
          >
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
        </Box>
      )}
      {page === "transactionHistory" && (
        <TransactionHistory setPage={setPage} />
      )}
    </React.Fragment>
  );
};

export default UserControl;
