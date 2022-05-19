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

const TransferFilterNav = () => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Box sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select options={options} />
          </FormControl>

          <Button 
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
