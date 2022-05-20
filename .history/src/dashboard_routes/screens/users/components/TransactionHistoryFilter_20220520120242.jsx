import React from "react";
import Box from "@mui/material/Box";
import Select from 'react-select'
import { useDispatch } from "react-redux";
import {
  Toolbar,
  Button,
  FormControl,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { setloader, setPage, setStart } from "../../../../redux_toolkit/slices/paginationSlice";

const TransactionHistoryFilter = (props) => {

  const dispatch = useDispatch();

  const options = [
    { value: "", label: 'All' },
    { value: 1, label: 'Success' },
    { value: 0, label: 'Failed' },
  ]
  const tr = [
    { value: "", label: 'All' },
    { value: "DR", label: "DR" },
    { value: "CR", label: "CR" },
  ]

  const desc = [
    { value: "", label: 'All' },
    { value: "Product scan", label: "Product scan" },
    { value: "Withrawal", label: "Withrawal" },
    { value: "Rejected point", label: "Rejected point" },
  ]

  return (
    <Box sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120, display: "flex" }} size="small">
            <Select isSearchable={false} options={options} onChange={(e) => props.setStatus(e.value)}/>
           
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120, display: "flex" }} size="small">
         <Select isSearchable={false} options={tr} onChange={(e) => props.setType(e.value)}/>
         </FormControl>
         <FormControl sx={{ m: 1, minWidth: 120, display: "flex" }} size="small">
         <Select isSearchable={false} options={desc} onChange={(e) => props.setDesc(e.value)}/>
         </FormControl>
          <Button 
          onClick={() => {
            props.reset()
            props.setRefresh(!props.refresh)
          }}
          variant="contained" 
          startIcon={<FilterAltIcon />}
          sx={{
            ml: 1,
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

  export default TransactionHistoryFilter;