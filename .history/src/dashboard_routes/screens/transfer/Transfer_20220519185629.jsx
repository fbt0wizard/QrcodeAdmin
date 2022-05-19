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
import 'react-toastify/dist/ReactToastify.css';
import PaginationComponent from "../../../components/PaginationComponent";
// import TransferFilterNav from "../../../components/TransferFilterNav";


const Transfer = () => {
  const dispatch = useDispatch();
  const { transfer } = useSelector((state) => state.data);
  const { transferPag } = useSelector((state) => state.pagination);
  const [modal, setModal] = useState(false);
  const [id, setId] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [status, setStatus] = useState("");

  let count = 1;

  useEffect(() => {
    const payload = {
      limit: `${transferPag.start},${transferPag.end}`,
      name: '',
      status: status,
      type: "",
    }
    axiosGet("transfers", payload).then((res) => {
      console.log(res.data.count)
      if (res.status === 200) {
        dispatch(setTransfer(res.data.data));
      } else {
        console.log(res);
      }
    });
  }, [refresh]); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = Object.keys(transfer).length === 0;

  return (
    <React.Fragment>
      <Dialog
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="Create Product"
      >
        <TransferDetails data={id} setModal={setModal} setRefresh={setRefresh} refresh={refresh}/>
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
                    {row.status === 0 ? (
                      <Status color="#dbbc00" content="Pending" />
                    ) : row.status === 1 ? (
                      <Status color="#00b800" content="Approved"/>
                    ) : (
                      <Status color="#e84747" content="Rejected"/>
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
                        mt: 1,
                        mb: 1,
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
      <PaginationComponent pagnitionData={transferPag} type="transfer" />
    </React.Fragment>
  );
};

export default Transfer;
