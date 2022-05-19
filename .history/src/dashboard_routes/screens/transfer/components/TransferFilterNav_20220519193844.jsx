import React from "react";
import Box from "@mui/material/Box";
import Select from 'react-select'
import {
  Toolbar,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const TransferFilterNav = (props) => {
  const options = [
    { value: "", label: 'All' },
    { value: 1, label: 'Approved' },
    { value: 0, label: 'Pending' },
    { value: 2, label: 'Rejected' }
  ]

  return (
    <Box sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select isSearchable={false} options={options} onChange={(e) => props.setStatus(e.value)}/>
          </FormControl>

          <Button 
          onClick={() => props.setRefresh(!props.refresh) }
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
        </Toolbar>
    </Box>
  );
};

export default TransferFilterNav;
