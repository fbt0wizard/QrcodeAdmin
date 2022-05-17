import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Tittle from "./Tittle";
import { Table, TableCell, TableRow, TableBody, Box } from "@mui/material";
import ApproveOrRejectTranfer from "./ApproveOrRejectTranfer";

const TransferDetails = (props) => {
  const { transfer } = useSelector((state) => state.data);

  const picked = transfer.filter(function (item) {
    return item.uuid === props.data;
  });

  const bankInfo = JSON.parse(picked[0].bank);

  return (
    <React.Fragment>
      <Box component="div" sx={{ textAlign: "center", mb: -1, mt: 2 }}>
        <Tittle>Transfer Information</Tittle>
      </Box>
      <Box
        component="div"
        maxWidth="lg"
        sx={{
          p: "16px 0",
          m: "0 1rem 1rem 1rem",
          bgcolor: "#fff",
        }}
      >
        <Box
          component="div"
          //   sx={{ width: "95%", m: "auto" }}
        >
          <Table size="small" sx={{ width: 450 }}>
            <TableBody>
              <TableRow className="myTable">
                <TableCell variant="head">Account Name</TableCell>
                <TableCell>{bankInfo.holder}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Bank Name</TableCell>
                <TableCell>{bankInfo.bank_name}</TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Account Number</TableCell>
                <TableCell>{bankInfo.acc_no}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Amount</TableCell>
                <TableCell className="__money">{picked[0].amount}</TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Date initiated</TableCell>
                <TableCell>
                  {moment(picked[0].created_at).format("LLL")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Last Updated</TableCell>
                <TableCell>
                  {moment(picked[0].updated_at).format("LLL")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <ApproveOrRejectTranfer data={props.data}/>
      </Box>
    </React.Fragment>
  );
};

export default TransferDetails;
