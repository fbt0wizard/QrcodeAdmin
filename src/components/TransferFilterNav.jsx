import React from "react";
import Box from "@mui/material/Box";
import {
  Toolbar,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const TransferFilterNav = () => {
  const [status, setStatus] = React.useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}>
        <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={status}
              label="Status"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={0}>Pending</MenuItem>
              <MenuItem value={1}>Approved</MenuItem>
            </Select>
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
