import {
  Container,
  Box,
  ImageListItem,
  ImageList,
  Typography,
  Button,
} from "@mui/material";
import React, { useRef } from "react";
import PrintIcon from "@mui/icons-material/Print";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { useSelector } from "react-redux";
import { put } from "../functions/apiCalls";
import ReactToPrint from "react-to-print";

const DisplayQr = ({ data, setModal2 }) => {
  const qrcode = useRef(null);
  const { products } = useSelector((state) => state.data);

  let pickedProduct = products.filter(function (item) {
    return item.uuid === data.qr[0].product;
  });

  // count the number of valid qr codes
  var validqr = data.qr.filter(function (item) {
    return item.printed === 0;
  });

  const prindAndDelete = async () => {
    let targetUuid = [];
    for (let i = 0; i < data.qr.length; i++) {
      targetUuid.push(data.qr[i].uuid);
    }
    window.print();
    const prep = {
      uuid: targetUuid,
      printed: 1,
      status: 0,
    };
    const res = await put(prep, `products/generate/qr`);

    console.log(res);
    setModal2(false);
  };

  const newQr = async () => {
    let targetUuid = [];
    for (let i = 0; i < data.qr.length; i++) {
      targetUuid.push(data.qr[i].uuid);
    }
    const prep = {
      uuid: targetUuid,
      printed: true,
      status: false,
    };
    const res = await put(prep, `products/generate/qr`);

    console.log(res);
    setModal2(false);
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Box
        component="div"
        sx={{
          textAlign: "center",
          bgcolor: "#eeeeee",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <Typography
          variant="h6"
          color="teal"
          sx={{ fontSize: 15, p: "7px 0", textTransform: "capitalize" }}
        >
          QR CODES Available for {pickedProduct[0].name}
        </Typography>
      </Box>
      <Container component="section" maxWidth="sm" sx={{ zIndex: 0 }}>
        <Typography
          variant="h6"
          color="teal"
          sx={{ fontSize: 13, p: "7px 0", textTransform: "capitalize" }}
        >
          Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.
          Donec rutrum congue leo eget malesuada.
        </Typography>
        {/* <ImageList
          sx={{ width: "100%", height: "100%", m: "10px auto" }}
          id="section1"
          cols={6}
          gap={0}
          ref={qrcode}
        > */}
        <div>
          {validqr.map((item, index) => (
            // <ImageListItem key={index} className="__qr_code">
            <ImageListItem key={index} className="__qr_code">
              <img
                src={`${item.path}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt=""
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </div>
        {/* </ImageList> */}
      </Container>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          bottom: 0,
          zIndex: 1,
          bgcolor: "#eeeeee",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            color="teal"
            sx={{
              fontSize: 14,
              pl: 2,
            }}
          >
            No of QR codes:{" "}
            <span style={{ color: "blue" }}>{validqr.length}</span>
          </Typography>
          <Typography
            variant="h6"
            color="teal"
            sx={{
              fontSize: 14,
              pl: 2,
            }}
          >
            Point: <span style={{ color: "blue" }}>{data.point}</span>
          </Typography>
        </Box>

        <Box>
          <Button
            onClick={newQr}
            type="button"
            variant="contained"
            sx={{
              m: 2,
              bgcolor: "#5c9499",
              "&:hover": {
                bgcolor: "#387075",
              },
            }}
            endIcon={<QrCodeScannerIcon />}
          >
            New QR
          </Button>
          <ReactToPrint
            documentTitle="QRCODES"
            content={() => qrcode.current}
            trigger={() => {
              return (
                <Button
                  // onClick={() => prindAndDelete()}
                  type="button"
                  variant="contained"
                  sx={{
                    m: 2,
                    bgcolor: "#5c9499",
                    "&:hover": {
                      bgcolor: "#387075",
                    },
                  }}
                  endIcon={<PrintIcon />}
                >
                  Print Codes
                </Button>
              );
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default DisplayQr;
