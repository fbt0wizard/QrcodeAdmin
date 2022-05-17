import React, { useEffect } from 'react'
import { axiosGet } from "../../../functions/apiCalls";
import Table from "@mui/material/Table";
import { Fab, Box } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Tittle from "../../../components/Tittle";
import TableRow from "@mui/material/TableRow";
import { Chip } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector, useDispatch } from "react-redux";
import { updateQrcode } from '../../../redux_toolkit/slices/dataSlice';
import moment from "moment";
import PaginationComponent from '../../../components/PaginationComponent';
import { setqrLoader, setqrTotalPage } from '../../../redux_toolkit/slices/paginationSlice';


const QrcodeScreen = () => {

  const dispatch = useDispatch();
  const { qrcode } = useSelector((state) => state.data);
  const { qrcodePag } = useSelector((state) => state.pagination)


  let count = qrcodePag.start + 1

    useEffect(() => {
      if (qrcodePag.showLoader) {
      dispatch(updateQrcode([]))
      }
      dispatch(setqrLoader(false))

      const payload = {
        limit: `${qrcodePag.start},${qrcodePag.end}`,
        name: "",
        status: "",
        type: "",
      };
      axiosGet("points", payload, false).then((res) => {
        if (res.status === 200) {
          dispatch(setqrTotalPage(Math.ceil(res.data.count/20)))
          dispatch(updateQrcode(res.data.data));
        } else {
          console.log(res);
        }
      });
    }, [qrcodePag.start]) // eslint-disable-line react-hooks/exhaustive-deps


    const pending = Object.keys(qrcode).length === 0


  return (
    <React.Fragment>
      <Tittle>QR Codes Transaction History</Tittle>
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
              <TableCell>User</TableCell>
              <TableCell>Transaction</TableCell>
              <TableCell>Transaction Point</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {qrcode.map((row) => (
              <TableRow key={row.uuid} className="__table_cell_bg">
                <TableCell>{count++}</TableCell>
                <TableCell>{getUserName(row.uuid)}</TableCell>
                <TableCell>{row.transaction_type || "-"}</TableCell>
                <TableCell>{row.point || "-"}</TableCell>
                <TableCell>{moment(row.updated_at).format("LLL")}</TableCell>
                <TableCell>{row.status === 1 ? <Chip
                        label="success"
                        sx={{
                          width: '75px',
                          bgcolor: "green",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      /> :
                      <Chip
                        label="failed"
                        sx={{
                          width: '75px',
                          bgcolor: "red",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />}</TableCell>
                <TableCell>
                <Fab
                      aria-label="more"
                      size="small"
                      sx={{
                        zIndex: 1,
                        bgcolor: "#5c9499",
                        color: "#fff",
                        "&:hover": {
                          bgcolor: "#fff",
                          color: "#387075",
                        },
                      }}
                    >
                      <ChevronRightIcon />
                    </Fab>
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
      <PaginationComponent pagnitionData={qrcodePag} />
    </React.Fragment>
  )
}

export default QrcodeScreen

const getUserName = () => {
  return "Adebyite"
}