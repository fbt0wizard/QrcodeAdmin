import { Box, Stack, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { put } from "../functions/apiCalls"
import { toast } from 'react-toastify';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


const ApproveOrRejectTranfer = (props) => {
  const [submitting, setSubmitting] = useState(false)
  const [open, setOpen] = React.useState(false);

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
          props.setRefresh(!props.refresh)
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
          onClick={() => handleAction(1)}
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
          // onClick={() => AlertDialogSlide()}
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure about this?"}</DialogTitle>
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ApproveOrRejectTranfer;



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

 function AlertDialogSlide() {
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>

    </div>
  );
}
