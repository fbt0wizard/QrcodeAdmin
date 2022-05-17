import { Button, Chip, Fab, Table, TableBody, TableCell, TableHead, TableRow, Toolbar } from '@mui/material'
import React, { useState, useEffect } from "react"
import { Box } from '@mui/system'
import MiniNavScreen from '../../../../components/MiniNavScreen';
import { axiosGet } from '../../../../functions/apiCalls';
import moment from "moment";

const TransactionHistory = (props) => {
  const [data, setData] = useState([])
 
  useEffect(() => {
    axiosGet('points', {user: props.user.uuid}).then((res) => {
      switch(res.data.status) {
        case 200:
          setData(res.data.data)
          break;
          default: 
          console.log(res.data.status)
      }
    })
  },[])

  const pending = Object.keys(data).length === 0
  return (
    <React.Fragment>
      <MiniNavScreen setPage={props.setPage}/>
      <Box sx={{width: "100%"}}>
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
              <TableCell>Transaction</TableCell>
              <TableCell>Transaction Point</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>#</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.uuid} className="__table_cell_bg">
                <TableCell>{"1"}</TableCell>
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
                      {/* <ChevronRightIcon /> */}
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
      </Box>
    </React.Fragment>
  )
}

export default TransactionHistory