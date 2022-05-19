import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import {
  // setEnd,
  setPage,
  setStart,
  setqrStart,
  // setqrEnd,
  setqrPage,
  setloader,
  setqrLoader,
  setUserStart,
  setUserLoader,
  setUserPage,
} from "../redux_toolkit/slices/paginationSlice";

const PaginationComponent = (props) => {
  const dispatch = useDispatch();

  const handleSwitch = (e, p) => {
    switch (props.pagnitionData.for) {
      case "qrcode":
        qrcode(e, p);
        break;
      case "product":
        product(e, p);
        break;
      case "user":
        users(e, p);
        break;
      default:
    }
  };

  // console.log(props.pagnitionData.page)
  return (
    <Stack spacing={2} sx={{ display: "flex" }}>
      <Pagination
        color="secondary"
        // onChange={props.pagnitionData.for === "qrcode" ? qrcode : product}
        onChange={handleSwitch}
        page={props.pagnitionData.page}
        count={props.pagnitionData.totalPage}
        variant="outlined"
        shape="rounded"
      />
      <Typography variant="body1" sx={{ pl: "3px", fontSize: 13 }}>
        Page {props.pagnitionData.page} of {props.pagnitionData.totalPage}
      </Typography>
    </Stack>
  );

  // controlers for pagination

  function product(e, p) {
    dispatch(setloader(true));
    switch (p) {
      case 1:
        dispatch(setStart(0));
        // dispatch(setEnd(12));
        break;
      default:
        dispatch(setStart(p * 12 - 12, , props.type));
    }
    dispatch(setPage(p));
  }
  function qrcode(e, p) {
    dispatch(setqrLoader(true));
    switch (p) {
      case 1:
        dispatch(setqrStart(0));
        // dispatch(setqrEnd(20));
        break;
      default:
        dispatch(setqrStart(p * 20 - 20));
    }
    dispatch(setqrPage(p));
  }

  function users(e, p) {
    dispatch(setUserLoader(true));
    switch (p) {
      case 1:
        dispatch(setUserStart(0));
        // dispatch(setqrEnd(20));
        break;
      default:
        dispatch(setUserStart(p * 20 - 20));
    }
    dispatch(setUserPage(p));
  }
};

export default PaginationComponent;
