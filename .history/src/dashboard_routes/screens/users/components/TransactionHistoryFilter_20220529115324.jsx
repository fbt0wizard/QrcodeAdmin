import React from "react";
import Box from "@mui/material/Box";
import Select from "react-select";
import { Toolbar, Button, FormControl, Grid } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const TransactionHistoryFilter = (props) => {
  const options = [
    { value: "", label: "All" },
    { value: 1, label: "Success" },
    { value: 0, label: "Failed" },
  ];
  const tr = [
    { value: "", label: "All" },
    { value: "DR", label: "DR" },
    { value: "CR", label: "CR" },
  ];

  const desc = [
    { value: "", label: "All" },
    { value: "Product scan", label: "Product scan" },
    { value: "Withrawal", label: "Withrawal" },
    { value: "Rejected point", label: "Rejected point" },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid component="div" sx={{
        display: "flex",
        flexWrap: "wrap",
        bgcolor: "#e9efef",
        borderRadius: 1,
        p: 1,
      }}>
        <Grid component="div" sx={{m: 1}}>
          <FormControl size="small">
            <Select
              isSearchable={false}
              options={options}
              onChange={(e) => props.setStatus(e.value)}
            />
          </FormControl>
        </Grid>
        <Grid component="div" sx={{m: 1}}>
          <FormControl size="small">
            <Select
              isSearchable={false}
              options={tr}
              onChange={(e) => props.setType(e.value)}
            />
          </FormControl>
        </Grid>
        <Grid component="div" sx={{m: 1}}>
          <FormControl size="small">
            <Select
              isSearchable={false}
              options={desc}
              onChange={(e) => props.setDesc(e.value)}
            />
          </FormControl>
        </Grid>
        <Grid component="div" sx={{m: 1}}>
          <Button
            onClick={() => {
              props.reset();
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
        </Grid>
      </Grid>
    </Box>
  );
};

export default TransactionHistoryFilter;
