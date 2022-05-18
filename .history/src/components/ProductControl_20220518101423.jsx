import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import QrCode2RoundedIcon from "@mui/icons-material/QrCode2Rounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import CreateProduct from "./CreateProduct";
import { useDispatch, useSelector } from "react-redux";
import PointsAndQR from "./PointsAndQR";
import { deleteData } from "../functions/apiCalls";
import { clearAlert, setAlert } from "../redux_toolkit/slices/alertSlice";
import { ToastContainer, toast } from "react-toastify";
// import ToggleOffRoundedIcon from "@mui/icons-material/ToggleOffRounded";
import "react-toastify/dist/ReactToastify.css";

// import for dialog

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MiniNavScreen from "./MiniNavScreen";

const ProductControl = ({ picked }) => {
  const toastId = useRef(null);
  const notify = () => toast("Deleting product, be patient!");
  const dismiss = () => toast.dismiss(toastId.current);

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const dispatch = useDispatch();
  const { api } = useSelector((state) => state.userData);

  const handleDelete = async () => {
    handleClose();
    notify();
    const res = await deleteData(`products/${picked[0].uuid}`, api);
    if (res.message === "Data deleted successfully") {
      dispatch(
        setAlert({
          alert: "Product deleted successfully",
          type: "success",
          delete: "yes",
        })
      );
      dismiss();
      setTimeout(function () {
        dispatch(clearAlert());
      }, 6000);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const btnAction = [
    {
      id: 1,
      name: "Edit Product",
      btnAction: setModal,
      icon: <EditRoundedIcon sx={{ fontSize: 50 }} />,
    },
    {
      id: 2,
      name: "Generate Qr",
      btnAction: setModal2,
      icon: <QrCode2RoundedIcon sx={{ fontSize: 50 }} />,
    },
    // {
    //   id: 3,
    //   name: "Status",
    //   btnAction: "",
    //   icon: <ToggleOffRoundedIcon sx={{ fontSize: 50 }} />,
    // },
    {
      id: 3,
      name: "Delete",
      btnAction: handleClickOpen,
      icon: <DeleteRoundedIcon sx={{ fontSize: 50 }} />,
    },
  ];

  return (
    <React.Fragment>
      <MiniNavScreen main={true} />
      <ToastContainer />
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="Edit Product"
      >
        <CreateProduct picked={picked} setModal={setModal} />
      </Dialog>
      <Dialog
        open={modal2}
        onClose={() => setModal2(false)}
        aria-labelledby="Points And QRCode"
      >
        <div>
          <PointsAndQR picked={picked} setModal2={setModal2} />
        </div>
      </Dialog>
      <Box sx={{ display: "flex", flexWrap: "wrap", p: 2 }}>
        {btnAction.map((item) => (
          <Button
            key={item.id}
            onClick={() => item.btnAction(true)}
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
      <ResponsiveDialog
        handleDelete={handleDelete}
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
      />
    </React.Fragment>
  );
};
export default ProductControl;

// dialod for deleting product

function ResponsiveDialog(props) {
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm To Delete"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.handleClose}>
            Cancel
          </Button>
          <Button onClick={props.handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
