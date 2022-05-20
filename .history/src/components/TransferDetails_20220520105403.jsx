import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import Tittle from "./Tittle";
import { Table, TableCell, TableRow, TableBody, Box } from "@mui/material";
import ApproveOrRejectTranfer from "./ApproveOrRejectTranfer";
import Status from "./Status";
import { axiosGet } from "../functions/apiCalls";

const TransferDetails = (props) => {
  const { transfer } = useSelector((state) => state.data);
  const [userInfo, setuserInfo] = useState(null);

  const picked = transfer.filter(function (item) {
    return item.uuid === props.data;
  });

  const bankInfo = JSON.parse(picked[0].bank);

  useEffect(() => {
    axiosGet(`users/${picked[0].user}`).then((res) => {
      setuserInfo(res.data.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  console.log(userInfo)
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
            <TableRow>
                <TableCell variant="head">User Name</TableCell>
                <TableCell>
                {userInfo !== null ? (
                    userInfo.name
                  ) : (
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">User Point</TableCell>               
                <TableCell className="__money">
                  {userInfo !== null ? (
                    userInfo.amount
                  ) : (
                    <i className="fa fa-spinner fa-spin" aria-hidden="true"></i>
                  )}
                </TableCell>
                
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Bank Account Name</TableCell>
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
                <TableCell variant="head">Status</TableCell>
                <TableCell>
                  {picked[0].status === 0 ? (
                    <Status color="#dbbc00" content="Pending" />
                  ) : picked[0].status === 1 ? (
                    <Status color="#00b800" content="Approved" />
                  ) : (
                    <Status color="#e84747" content="Rejected" />
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Date initiated</TableCell>
                <TableCell>
                  {moment(picked[0].created_at).format("LLL")}
                </TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Last Updated</TableCell>
                <TableCell>
                  {moment(picked[0].updated_at).format("LLL")}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        {picked[0].status === 0 && (
          <ApproveOrRejectTranfer
            data={props.data}
            setModal={props.setModal}
            setRefresh={props.setRefresh}
            refresh={props.refresh}
          />
        )}
      </Box>
    </React.Fragment>
  );
};

export default TransferDetails;
