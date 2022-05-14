import { Container, Box, Typography, Button, Fab } from "@mui/material";
import React, { useRef, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import { useSelector } from "react-redux";
import { put } from "../functions/apiCalls";
import ReactToPrint from "react-to-print";
import TableRowsIcon from "@mui/icons-material/TableRows";
import ViewComfyIcon from "@mui/icons-material/ViewComfy";

const DisplayQr = ({ data, setModal2 }) => {
  const qrcode = useRef(null);
  const { products } = useSelector((state) => state.data);

  const [form, setForm] = useState(true);
  const [count, setCount] = useState(0);

  let pickedProduct = products.filter(function (item) {
    return item.uuid === data.qr[0].product;
  });

  // count the number of valid qr codes
  var validqr = data.qr.filter(function (item) {
    return item.printed === 0;
  });

  const clearQr = async () => {
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
  console.log(count)
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
        <div ref={qrcode} className={form ? "__grid" : ""}>
          {validqr.map((item, index) => (
            <div key={index} className="__qr_wrapper">
              <img
                className="__qr_code"
                src={`${item.path}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.path}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt="qr code"
                onLoad={() => index + 1) === validqr ? setCount(index + 1) : null}
              />
            </div>
          ))}
        </div>
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
          <Fab
            onClick={() => setForm(false)}
            aria-label="list"
            size="small"
            sx={{
              ml: 2,
              bgcolor: "#5c9499",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#387075",
              },
            }}
          >
            <TableRowsIcon />
          </Fab>
          <Fab
            onClick={() => setForm(true)}
            aria-label="grid"
            size="small"
            sx={{
              ml: 2,
              bgcolor: "#5c9499",
              color: "#fff",
              "&:hover": {
                bgcolor: "#fff",
                color: "#387075",
              },
            }}
          >
            <ViewComfyIcon />
          </Fab>
          <ReactToPrint
            documentTitle="QRCODES"
            content={() => qrcode.current}
            trigger={() => {
              return (
                <Button
                  disabled={count === validqr.length ? false : true}
                  type="button"
                  variant="contained"
                  sx={{
                    width: 136,
                    m: 2,
                    bgcolor: "#5c9499",
                    "&:hover": {
                      bgcolor: "#387075",
                    },
                  }}
                  endIcon={<PrintIcon />}
                >
                  {count === validqr.length ? (
                    "Print Codes"
                  ) : (
                    <span
                      style={{
                        fontSize: 14,
                        marginLeft: 14,
                        color: "#565656",
                      }}
                    >
                      <i
                        style={{ fontSize: 15, marginRight: 6 }}
                        className="fa fa-spinner fa-spin"
                        aria-hidden="true"
                      ></i>
                      {`${count}/${validqr.length}`}
                    </span>
                  )}
                </Button>
              );
            }}
            removeAfterPrint={true}
            onAfterPrint={() => clearQr()}
          />
        </Box>
      </Box>
    </div>
  );
};

export default DisplayQr;
