import React, { useEffect, useState } from "react";
import {
  Table,
  Box,
  Fab,
  Chip,
  Typography,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TableRow from "@mui/material/TableRow";
import Tittle from "../../../components/Tittle";
import { useSelector, useDispatch } from "react-redux";
import { axiosGet } from "../../../functions/apiCalls";
import moment from "moment";
import { setUsers } from "../../../redux_toolkit/slices/dataSlice";
import { useNavigate } from "react-router-dom";
import UserFilterNav from "../users/components/UserFilterNav";
import { setloader } from "../../../redux_toolkit/slices/paginationSlice"
import PaginationComponent from "../../../components/PaginationComponent";

export default function Users() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.data);
  const { userPag } = useSelector((state) => state.pagination);

  const [name, setName] = useState("");
  const [status, setStatus] = useState(1);
  const [noRecord, setNoRecord] = useState(false);

  useEffect(() => {
    setNoRecord(false);

    if(userPag.showLoader) {
      dispatch(setUsers([]));
    }
    dispatch(setloader({load: false, type: "user"}))

    const payload = {
      limit: "0,12",
      name: name,
      status: status === 0 ? 1 : status === 2 ? 0 : status,
      type: "user",
    };

    axiosGet("users", payload, false).then((res) => {
      console.log(res)
      switch (res.data.status) {
        case 200:
          dispatch(setUsers(res.data.data));
          break;
        case 404:
          setNoRecord(true);
          break;
        default:
          console.log(res);
      }
    });
  }, [status, name]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setName(data.get("search"));
    setStatus(Number(data.get("status")));
    // console.log(data.get("search"), Number(data.get("status")))
  };

  const pending = noRecord ? false : Object.keys(users).length === 0;

  let count = 1;

  return (
    <React.Fragment>
      <Tittle>Users List</Tittle>
      <UserFilterNav handleSearch={handleSearch} />
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
          <Table size="small" sx={{ minWidth: 935, bgcolor: "#fff", mb: 5 }}>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>#</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!noRecord ? users.map((row) => (
                <TableRow key={row.uuid} className="__table_cell_bg">
                  <TableCell>{count++}</TableCell>
                  <TableCell>
                    <img
                      src={
                        row.avatar_link
                          ? row.avatar_link
                          : "assets/images/profile.png"
                      }
                      alt="avatar"
                      style={{
                        width: "45px",
                        border: "1px solid #e3e6f0",
                        borderRadius: "50%",
                        padding: "5px",
                      }}
                    />
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell sx={{ textTransform: "lowercase" }}>
                    {row.email}
                  </TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell className="__money">{row.amount}</TableCell>
                  <TableCell>
                    {row.access === "super" ? (
                      <Chip
                        label="Admin"
                        sx={{
                          width: "75px",
                          bgcolor: "green",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Chip
                        label="User"
                        sx={{
                          width: "75px",
                          bgcolor: "darkgoldenrod",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{moment(row.created_at).format("LLL")}</TableCell>
                  <TableCell>
                    <Fab
                      aria-label="more"
                      size="small"
                      onClick={() => navigate(`/users/manageUser/${row.uuid}`)}
                      sx={{
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
              )): null}
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
      <PaginationComponent pagnitionData={userPag} type="user"/>
    </React.Fragment>
  );
}
