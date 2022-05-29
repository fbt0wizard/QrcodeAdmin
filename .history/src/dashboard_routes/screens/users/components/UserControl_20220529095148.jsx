import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import TransactionHistory from "./TransactionHistory";
import MiniNavScreen from "../../../../components/MiniNavScreen";
import { useConfirm } from "material-ui-confirm";
import { put } from "../../../../functions/apiCalls";
import { toast } from "react-toastify";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import { useNavigate } from "react-router-dom";

const UserControl = (props) => {
  const navigate = useNavigate()
  const confirm = useConfirm();
  const [page, setPage] = useState("index");

  const control = [
    {
      id: 1,
      name: props.pickedUser.status === 1 ? "Suspend User" : "Re-activate",
      icon:
        props.pickedUser.status === 1 ? (
          <BlockIcon sx={{ fontSize: 50 }} />
        ) : (
          <ToggleOnIcon sx={{ fontSize: 50 }} />
        ),
      action: "",
    },
    {
      id: 2,
      name: "Transaction History",
      icon: <HistoryIcon sx={{ fontSize: 50 }} />,
      action: "transactionHistory",
    },
  ];

  const handleClick = () => {
    confirm({
      description:
        props.pickedUser.status === 1
          ? "Confirm to make user inactive!"
          : "Confirm to make user active!",
    })
      .then(() => {
        put(
          { status: props.pickedUser.status === 1 ? 0 : 1 },
          `users/${props.pickedUser.uuid}`
        ).then((response) => {
          switch (response.status) {
            case 200:
              toast.success(response.message);
              navigate(-1)
              break;
            default:
              toast.error("Failed please try again");
          }
        });
      })
      .catch(() => {
        /* ... */
      });
  };

  return (
    <React.Fragment>
      {page === "index" && (
        <Box>
          <MiniNavScreen main={true} />
          <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
            {control.map((item) => (
              <Button
                key={item.id}
                onClick={() =>
                  item.action === "" ? handleClick() : setPage(item.action)
                }
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
        <TransactionHistory setPage={setPage} user={props.pickedUser} />
      )}
    </React.Fragment>
  );
};

export default UserControl;
