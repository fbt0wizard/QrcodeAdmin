import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Toolbar,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const UserFilterNav = ({ handleSearch }) => {

  const [disableButton, setDisableButton] = useState(false)
  const [status, setStatus] = useState("");
  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      sx={{ width: "100%", bgcolor: "#0080800f", borderRadius: 1 }}
    >
      <Toolbar>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small">Status</InputLabel>
            <Select
            sx={{bgcolor: "#fff"}}
              labelId="demo-select-small"
              id="demo-select-small"
              value={status}
              onChange={handleChange}
              label="Status"
              name="status"
            >
              <MenuItem value={1}>Active</MenuItem>
              <MenuItem value={2}>Inactive</MenuItem>
            </Select>
          </FormControl>

        <TextField
          onChange={() => setDisableButton(false)}
          label="Name"
          id="outlined-size-small"
          size="small"
          name="search"
          sx={{
            mr: 2,
            bgcolor: "#fff"
          }}
        />

        <Button
          disabled={disableButton}
          type="submit"
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

export default UserFilterNav;
