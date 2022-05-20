import React from "react";
import Box from "@mui/material/Box";
import Select from 'react-select'
import { useDispatch } from "react-redux";
import {
  Toolbar,
  Button,
  FormControl,
  TextField,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { setloader, setPage, setStart } from "../../../../redux_toolkit/slices/paginationSlice";

const TransferFilterNav = (props) => {

  const dispatch = useDispatch();

  const options = [
    { value: "", label: 'All' },
    { value: 1, label: 'Approved' },
    { value: 0, label: 'Pending' },
    { value: 2, label: 'Rejected' }
  ]

  return (
    <Box sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120, display: "flex" }} size="small">
            <Select isSearchable={false} options={options} onChange={(e) => props.setStatus(e.value)}/>
          </FormControl>
          <TextField
          onChange={(e) => props.setAmount(e.target.value)}
          type="number"
          label="Amount"
          id="outlined-size-small"
          size="small"
          name="search"
          sx={{
            mr: 2,
            bgcolor: "#fff"
          }}
        />
          <Button 
          onClick={() => {
            dispatch(setStart({load: 0, type: "transfer"}));
            dispatch(setPage({load: 1, type: "transfer"}));
            dispatch(setloader({load: true, type: "transfer"}));
            props.setRefresh(!props.refresh)
          }}
          variant="contained" 
          startIcon={<FilterAltIcon />}
          sx={{
            bgcolor: "#5c9499",
            "&:hover": {
              bgcolor: "#387075",
            },
          }}
          >
            Filter
          </Button>
        </Toolbar>
    </Box>
  );
};

export default TransferFilterNav;
