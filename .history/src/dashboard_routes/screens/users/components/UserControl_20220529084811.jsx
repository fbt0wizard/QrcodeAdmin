import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import TransactionHistory from "./TransactionHistory";
import MiniNavScreen from "../../../../components/MiniNavScreen";
import { useConfirm } from 'material-ui-confirm';
import { put } from "../../../../functions/apiCalls";
import { toast } from "react-toastify";

const UserControl = (props) => {
  const confirm = useConfirm();
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
    }
  ];

  const handleClick = () => {
    confirm({ description: 'Confirm to make user inactive!' })
      .then(() => { 
        put({status: 0}, `users/${props.pickedUser.uuid}`).then(response => {
          switch(response.status) {
            case 200: 
            toast.success(response.message)
            break;
            default:
              toast.error("Failed please try again")
          }
        })
       })
      .catch(() => { /* ... */ });
  };



  return (
    <React.Fragment>
      {page === "index" && (
        <Box>
          <MiniNavScreen  main={true}/>
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
                onClick={() => item.action === "" ? handleClick() : setPage(item.action)}
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
        <TransactionHistory setPage={setPage} user={props.pickedUser}/>
      )}
    </React.Fragment>
  );
};

export default UserControl;
