import React, { useState, useRef } from "react";
import { Button, Box, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { AlertSuccess } from "./Alerts";
import { clearAlert, setAlert } from "../redux_toolkit/slices/alertSlice";
import { post } from "../functions/apiCalls";

export default function AwardPoint({ picked }) {
  console.log(picked)
  const { alert, alertType } = useSelector((state) => state.alert);
  const { api } = useSelector((state) => state.userData);
  const { swithScreen } = useSelector((state) => state.others);
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const submitBtn = useRef(null);
  const myForm = useRef(null);

  const [age, setAge] = useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const prep = {
      point: data.get("point"),
      product: picked[0].uuid,
      no_of_qrcode: Number(data.get("no_of_qrcode")),
    };
    setSubmitting(true);
    submitBtn.current.disabled = true;
    const res = await post(prep, "products/generate/qr", api);
    console.log(res)
    if (res.message === "Data recorded succefully") {
      dispatch(
        setAlert({ alert: "Point Awarded Succefully", type: "success" })
      );
      myForm.current.reset();
      setTimeout(function () {
        dispatch(clearAlert());
      }, 6000);
    } else {
      console.log(res);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

  return (
    <Box
      ref={myForm}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
        justifyContent: "center",
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%", mb: 2 }}>
        <Typography
          variant="h5"
          component="h5"
          color="teal"
          sx={{ fontWeight: 600, fontSize: "19px" }}
        >
          Award Point To This Product
        </Typography>

        <Typography
          variant="h5"
          component="h5"
          color="red"
          sx={{ fontSize: "12px" }}
        >
          {swithScreen &&
            "This product has no QR code, award a point to generate QR code"}
        </Typography>
      </Box>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
        sx={{ mt: 1, mb: 1 }}
      >
        <TextField
          id="outlined-required"
          type="number"
          required
          fullWidth
          name="point"
          label="Point"
          size="small"
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-required">No of QR</InputLabel>
          <Select
            name="no_of_qrcode"
            label="No of QR"
            labelId="demo-select-small"
            id="demo-simple-select-required-label"
            value={age}
            onChange={handleChange}
            required
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            <MenuItem value={50}>Fifty</MenuItem>
            <MenuItem value={100}>One Hundred</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <div>
        <Button
          fullWidth
          ref={submitBtn}
          type="submit"
          variant="contained"
          sx={{
            fontSize: 17,
            textTransform: "capitalize",
            m: "1rem auto",
            bgcolor: "#5c9499",
            "&:hover": {
              bgcolor: "#387075",
            },
          }}
        >
          {submitting ? (
            <i
              style={{ marginRight: 5 }}
              className="fa fa-spinner fa-spin"
              aria-hidden="true"
            ></i>
          ) : null}{" "}
          Submit
        </Button>
      </div>
      {alert && <AlertSuccess alert={alert} type={alertType} />}
    </Box>
  );
}
