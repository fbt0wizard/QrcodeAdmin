import { Box, Stack, Fab, Tooltip } from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { put } from "../functions/apiCalls"

const ApproveOrRejectTranfer = (props) => {
  console.log(produceWithPatches)
  const handleAction = (choice) => {
    const payload = {
      status: choice,
      uuid: ""
    }
    put('transfer', payload).then((res) => {
      console.log(res)
    })
  }
  return (
    <Box component="div" sx={{ m: "10px auto 0 auto", width: "80%" }}>
      <Stack direction="row" spacing={12} justifyContent="space-between">
      <Tooltip title="Approve" placement="top" arrow>
        <Fab
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
          onClick={() => handleAction("2")}
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
