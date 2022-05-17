import { Box, Stack, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { put } from "../functions/apiCalls"
import { toast } from 'react-toastify';

const ApproveOrRejectTranfer = (props) => {
  const [submitting, setSubmitting] = useState(false)

  const handleAction = (choice) => {
    setSubmitting(true)
    const payload = {
      status: choice,
      uuid: props.data
    }
    put(payload, 'transfers').then((res) => {
      setSubmitting(false)
      if(res)
      switch(res.status) {
        case 200:
          toast.success("Updated successfully!")
          props.setModal(false)
          break;
        default:
          console.log(res)
          toast.error("Failed please try again!")
      }
    })
  }
  return (
    <Box component="div" sx={{ m: "10px auto 0 auto", width: "80%" }}>
      <Stack direction="row" spacing={12} justifyContent="space-between">
      <Tooltip title="Approve" placement="top" arrow>
        <Fab
          disabled={submitting}
          onClick={() => handleAction('1')}
          aria-label="more"
          size="large"
          sx={{
            zIndex: 1,
            bgcolor: "#fff",
            color: "#1fe761",
            "&:hover": {
              bgcolor: "#e7e7e7",
              color: "#1fe761",
            },
          }}
        >
          <CheckRoundedIcon sx={{ fontSize: 40 }} />
        </Fab>
        </Tooltip>
        <Tooltip title="Reject" placement="top" arrow>
        <Fab
          disabled={submitting}
          onClick={() => handleAction(2)}
          aria-label="more"
          size="large"
          sx={{
            zIndex: 1,
            bgcolor: "#fff",
            color: "red",
            "&:hover": {
                bgcolor: "#e7e7e7",
              color: "red",
            },
          }}
        >
          <CancelRoundedIcon sx={{ fontSize: 40 }} />
        </Fab>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ApproveOrRejectTranfer;
