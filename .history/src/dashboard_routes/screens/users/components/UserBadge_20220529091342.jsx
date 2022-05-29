import React from "react";
import {
  Typography,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Box,
} from "@mui/material";
import moment from "moment";
import Status from "../../../../components/Status"

const UserBadge = ({ pickedUser }) => {
  return (
    <Card sx={{ minWidth: 270, mr: 2, height: "max-content" }}>
      <Typography
        gutterBottom
        color="teal"
        variant="h5"
        component="h2"
        sx={{ bgcolor: "#eaeaea", p: 1, fontSize: 19, fontWeight: 600, textTransform: "capitalize" }}
      >
        {pickedUser.name}
      </Typography>
      <CardMedia
        component="img"
        image={
          pickedUser.image
            ? pickedUser.image
            : "/assets/images/profile.png"
        }
        alt={pickedUser.name}
        sx={{ m: "0 auto", width: 170 }}
      />
      <Box component="div" sx={{ pb: 2, pt: 2 }}>
        <CardContent
          sx={{ width: "93%", overflowX: "scroll", m: "auto", p: 0 }}
        >
          <Divider light />
          <Table size="small" sx={{ width: 302 }}>
            <TableBody>
              <TableRow className="myTable">
                <TableCell variant="head">Point</TableCell>
                <TableCell className="__money">
                  {pickedUser.amount}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Phone No</TableCell>
                <TableCell>{pickedUser.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Email</TableCell>
                <TableCell sx={{ textTransform: "lowercase" }}>
                  {pickedUser.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Status</TableCell>
                <TableCell>
                <Status color={pickedUser.status === 1 ? '#39a821' : "#07a8e7"} content={pickedUser.status === 1 ? "Active" : "Inactive"}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Access</TableCell>
                <TableCell>
                <Status color={pickedUser.type === "user" ? '#f7c803' : "#07a8e7"} content={pickedUser.type}/>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Reg Date</TableCell>
                <TableCell>
                  {moment(pickedUser.created_at).format("LLL")}
                </TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Last Updated</TableCell>
                <TableCell>
                  {/* {moment(pickedUser[0].updated_at).format("LLL")} */}
                  {moment(pickedUser.updated_at).fromNow()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Box>
    </Card>
  );
};

export default UserBadge;
