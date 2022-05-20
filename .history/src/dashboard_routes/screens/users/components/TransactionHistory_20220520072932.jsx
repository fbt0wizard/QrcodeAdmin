import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import MiniNavScreen from "../../../../components/MiniNavScreen";
import { axiosGet } from "../../../../functions/apiCalls";
import moment from "moment";
import Tittle from "../../../../components/Tittle";
import Status from "../../../../components/Status";


const TransactionHistory = (props) => {
  const [data, setData] = useState([]);
  const [noRecord, setNoRecord] = useState(false);
  const [paginate, setPaginate] = useState({
    start: 0,
    end: 10,
    totalPage: 1,
    page: 1,
  });

  let count = paginate.start + 1;

  useEffect(() => {
    const payload = {
      limit: `${paginate.start},${paginate.end}`,
      status: "",
      user: props.user.uuid,
    };
    setData([]);
    setNoRecord(false);
    axiosGet("points", payload).then((res) => {
      // console.log(res.data.data)
      switch (res.data.status) {
        case 200:
          setPaginate({
            ...paginate,
            totalPage: Math.ceil(res.data.count / 10),
          });
          setData(res.data.data);
          break;
        case 404:
          setNoRecord(true);
          setData(res.data);
          break;
        default:
          console.log(res.data.status);
      }
    });
  }, [paginate.start]); // eslint-disable-line react-hooks/exhaustive-deps

  const pending = Object.keys(data).length === 0;

  const controlPag = (e, p) => {
    switch (p) {
      case 1:
        setPaginate({ ...paginate, start: 0, page: p });
        break;
      default:
        setPaginate({ ...paginate, start: p * 10 - 10, page: p });
    }
  };

  return (
    <React.Fragment>
      {/* <MiniNavScreen setPage={props.setPage} /> */}
      <Tittle>Transaction Point History</Tittle>
      <Box sx={{ 
        width: "97%",
        p: "16px 0",
        m: "1rem 0",
        boxShadow: 1,
        borderRadius: 2,
        bgcolor: "#fff",

        }}>
        <Box
          component="div"
          maxWidth="lg"
          sx={{
            width: "95%",
            overflowX: "scroll",
            m: "auto"
          }}
        >
          <Box
            component="div"
            sx={{ width: "95%", minWidth: 700, mb: 5 }}
          >
            <Table size="small" sx={{  }}>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Desc</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Point</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Balance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!noRecord &&
                  data.map((row) => (
                    <TableRow key={row.uuid} className="__table_cell_bg">
                      <TableCell>{count++}</TableCell>
                      <TableCell className={row.transaction_type}>
                        {row.transaction_type || "-"}
                      </TableCell>
                      <TableCell>{row.desc || "-"}</TableCell>
                      <TableCell>{row.product !== null && row.product.name}</TableCell>
                      <TableCell className="__money">
                        {row.point || "-"}
                      </TableCell>
                      <TableCell>
                        {moment(row.updated_at).format("LLL")}
                      </TableCell>
                      <TableCell>
                        {row.status === 1 ? (
                          <Status color="#29af29" content="success" />
                        ) : (
                          <Status color="rgb(210, 0, 0)" content="failed" />
                        )}
                      </TableCell>
                      <TableCell className="__money">{row.total || "-"}</TableCell>
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
        <Stack spacing={2} sx={{ display: "flex" }}>
          <Pagination
            color="secondary"
            onChange={controlPag}
            page={paginate.page}
            count={paginate.totalPage}
            variant="outlined"
            shape="rounded"
          />
          <Typography variant="body1" sx={{ pl: "3px", fontSize: 13 }}>
            Page {paginate.page} of {paginate.totalPage}
          </Typography>
        </Stack>
      </Box>
    </React.Fragment>
  );
};

export default TransactionHistory;
