import { Box, Stack, Fab, Tooltip } from "@mui/material";
import React from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

const ApproveOrRejectTranfer = () => {
  return (
    <Box component="div" sx={{ m: "10px auto 0 auto", width: "80%" }}>
      <Stack direction="row" spacing={12} justifyContent="space-between">
      <Tooltip title="Approve" arrow>
        <Fab
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
        <Tooltip title="Reject" arrow>
        <Fab
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
