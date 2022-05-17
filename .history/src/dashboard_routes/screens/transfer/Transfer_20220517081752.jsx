import React, { useEffect, useState } from "react";
import { axiosGet } from "../../../functions/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { setTransfer } from "../../../redux_toolkit/slices/dataSlice";
import Tittle from "../../../components/Tittle";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import {
  Table,
  TableBody,
  Box,
  TableHead,
  TableCell,
  Button,
  TableRow,
  Dialog,
} from "@mui/material";
import moment from "moment";
import TransferDetails from "../../../components/TransferDetails";
import Status from "../../../components/Status";
// import TransferFilterNav from "../../../components/TransferFilterNav";

const Transfer = () => {
  const dispatch = useDispatch();
  const { transfer } = useSelector((state) => state.data);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [snackbar , setSnackbar] = useState({
    message: "",
    type: "",
    status: false
  })

  let count = 1;

  useEffect(() => {
    axiosGet("transfers", false).then((res) => {
      if (res.status === 200) {
        dispatch(setTransfer(res.data.data));
      } else {
        console.log(res);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = Object.keys(transfer).length === 0;

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="Create Product"
      >
        <TransferDetails data={id} />
      </Dialog>
      <Tittle>Transfer</Tittle>
      {/* <TransferFilterNav handleSearch={handleSearch}/> */}
      <Box
        component="div"
        maxWidth="lg"
        sx={{
          p: "16px 0",
          m: "1rem 0",
          boxShadow: 1,
          borderRadius: 2,
          bgcolor: "#fff",
        }}
      >
        <Box
          component="div"
          sx={{ width: "95%", overflowX: "scroll", m: "auto" }}
        >
          <Table size="small" sx={{ minWidth: 935, mb: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Transfer</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date initiated</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfer.map((row) => (
                <TableRow key={row.uuid} className="__table_cell_bg">
                  <TableCell>{count++}</TableCell>
                  <TableCell>
                    <CurrencyExchangeIcon />
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {JSON.parse(row.bank).holder}
                  </TableCell>
                  <TableCell>
                    {row.status === "0" ? (
                      <Status color="#dbbc00" content="Pending" />
                    ) : row.status === "1" ? (
                      <Status color="#00b800" content="Approved"/>
                    ) : (
                      <Status color="red" content="Rejected"/>
                    )}
                  </TableCell>
                  <TableCell className="__money">{row.amount}</TableCell>
                  <TableCell>{moment(row.created_at).format("LLL")}</TableCell>
                  <TableCell>
                    <Button
                      type="button"
                      variant="contained"
                      sx={{
                        mr: 2,
                        textTransform: "capitalize",
                        mt: 2,
                        mb: 2,
                        bgcolor: "#5c9499",
                        "&:hover": {
                          bgcolor: "#387075",
                        },
                      }}
                      onClick={() => {
                        setModal(true);
                        setId(row.uuid);
                      }}
                      startIcon={<ReceiptRoundedIcon />}
                    >
                      Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pending && (
            <div style={{ textAlign: "center" }}>
              <i
                style={{ fontSize: 40, margin: 18 }}
                className="fa fa-spinner fa-spin"
                aria-hidden="true"
              ></i>
            </div>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default Transfer;
