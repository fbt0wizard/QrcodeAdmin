import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import {
  setPage,
  setStart,
  setloader,
} from "../redux_toolkit/slices/paginationSlice";

const PaginationComponent = (props) => {
  const dispatch = useDispatch();


  function handlePagination(e, p) {

    dispatch(setloader({load: true, type: props.type}));
    switch (p) {
      case 1:
        dispatch(setStart({load: 0, type: props.type}));
        break;
      default:
        dispatch(setStart({load: p * 12 - 12, type: props.type}));
    }
    dispatch(setPage({load: p, type: props.type}));
  }


  return (
    <Stack spacing={2} sx={{ display: "flex" }}>
      <Pagination
        color="secondary"
        onChange={handlePagination}
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
};

export default PaginationComponent;
