import {
  Button,
  Chip,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MiniNavScreen from "../../../../components/MiniNavScreen";
import { axiosGet } from "../../../../functions/apiCalls";
import moment from "moment";
import Tittle from "../../../../components/Tittle";
import { useSelector, useDispatch } from "react-redux";
import PaginationComponent from "../../../../components/PaginationComponent";
import { setqrTotalPage } from "../../../../redux_toolkit/slices/paginationSlice";

const TransactionHistory = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [noRecord, setNoRecord] = useState(false);

  const { qrcodePag } = useSelector((state) => state.pagination);

  let count = qrcodePag.start + 1;

  useEffect(() => {
    const payload = {
      limit: `${qrcodePag.start},${qrcodePag.end}`,
      status: "",
      user: props.user.uuid,
    };
    setData([]);
    setNoRecord(false);
    axiosGet("points", payload).then((res) => {
      switch (res.data.status) {
        case 200:
          dispatch(setqrTotalPage(Math.ceil(res.data.count / 20)));
          setData(res.data.data);
          break;
        case 404:
          setNoRecord(true);
          break;
        default:
          console.log(res.data.status);
      }
    });
  }, [qrcodePag.start]); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = Object.keys(data).length === 0;
  return (
    <React.Fragment>
      <MiniNavScreen setPage={props.setPage} />
      <Tittle>Transaction Point History</Tittle>
      <Box sx={{ width: "100%" }}>
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
            <Table size="small" sx={{ minWidth: 400, mb: 5 }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Transaction</TableCell>
                  <TableCell>Point</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!noRecord && data.map((row) => (
                  <TableRow key={row.uuid} className="__table_cell_bg">
                    <TableCell>{count++}</TableCell>
                    <TableCell>{row.transaction_type || "-"}</TableCell>
                    <TableCell>{row.point || "-"}</TableCell>
                    <TableCell>
                      {moment(row.updated_at).format("LLL")}
                    </TableCell>
                    <TableCell>
                      {row.status === 1 ? (
                        <Chip
                          label="success"
                          sx={{
                            width: "75px",
                            bgcolor: "green",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      ) : (
                        <Chip
                          label="failed"
                          sx={{
                            width: "75px",
                            bgcolor: "red",
                            color: "#fff",
                            fontWeight: 600,
                          }}
                        />
                      )}
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
            {noRecord && (
              <div style={{ textAlign: "center" }}>
                <Typography
                  variant="h6"
                  color="#5c9499"
                  sx={{ fontSize: 15, margin: 2 }}
                >
                  No Record Found
                </Typography>
              </div>
            )}
          </Box>
        </Box>
        <PaginationComponent pagnitionData={qrcodePag} />
      </Box>
    </React.Fragment>
  );
};

export default TransactionHistory;
