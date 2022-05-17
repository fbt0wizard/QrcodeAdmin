import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar(props) {
  const [open, setOpen] = React.useState(props.snackbar.status);
  React.useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  }, []);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert severity={props.snackbar.type} sx={{ width: "100%" }}>
          {`${props.snackbar,message}!`}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
