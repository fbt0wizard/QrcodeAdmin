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
  Chip,
} from "@mui/material";
import moment from "moment";

const ProductBadge = ({ picked }) => {

  return (
    <Card sx={{ minWidth: 270, mr: 2, height: "max-content" }}>
      <Typography
        gutterBottom
        color="teal"
        variant="h5"
        component="h2"
        sx={{ bgcolor: "#eaeaea", p: 1, fontSize: 19, fontWeight: 600 }}
      >
        {picked[0].name}
      </Typography>
      <CardMedia
        component="img"
        image={
          picked[0].images
            ? picked[0].images
            : "/assets/images/product.png"
        }
        alt={picked[0].name}
        sx={{ m: "0 auto", width: 170 }}
      />
      <Box component="div" sx={{ pb: 2, pt: 2 }}>
        <CardContent
          sx={{ width: "93%", overflowX: "scroll", m: "auto", p: 0 }}
        >
          <Divider light />
          <Table size="small" sx={{ width: 300 }}>
            <TableBody>
              <TableRow className="myTable">
                <TableCell variant="head">Price</TableCell>
                <TableCell className="__money">{"₦ " + format(picked[0].price)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Desc</TableCell>
                <TableCell>{picked[0].desc}</TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Status</TableCell>
                <TableCell>
                {picked[0].status === "1" ? (
                      <Chip
                        label="Active"
                        sx={{
                          width: "75px",
                          bgcolor: "green",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    ) : (
                      <Chip
                        label="Inactive"
                        sx={{
                          width: "75px",
                          bgcolor: "#f10000",
                          color: "#fff",
                          fontWeight: 600,
                        }}
                      />
                    )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell variant="head">Date</TableCell>
                <TableCell>{moment(picked[0].created_at).format("LLL")}</TableCell>
              </TableRow>
              <TableRow className="myTable">
                <TableCell variant="head">Last Updated</TableCell>
                <TableCell>{moment(picked[0].updated_at).format("LLL")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Box>
    </Card>
  );

  function format (data){
    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
};

export default ProductBadge;
