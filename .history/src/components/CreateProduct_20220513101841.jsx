import React, { useState, useRef } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AlertSuccess } from "./Alerts";
import { apnData, post, postFile, put } from "../functions/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert, setAlert } from "../redux_toolkit/slices/alertSlice";
import { updateProducts } from "../redux_toolkit/slices/dataSlice";
import ImageUpload from "./ImageUpload"
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

export default function CreateProduct({ picked }) {
  const dispatch = useDispatch();
  const submitBtn = useRef(null);
  const myForm = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState(null)

  const { alert, alertType } = useSelector((state) => state.alert);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const prep = {
      name: data.get("name"),
      price: data.get("price"),
      desc: data.get("desc"),
      images: data.get('images')
    };

    postFile('upload', { file, folder: 'products', name: "product" }).then(res => {
      console.log(res)
    })
    return
    setSubmitting(true);
    submitBtn.current.disabled = true;
    const res = await post(prep, "products");
    if (res.message === "Data recorded succefully") {
      dispatch(
        setAlert({ alert: "Product Created Succefully", type: "success" })
      );
      myForm.current.reset();
      setTimeout(function () {
        dispatch(clearAlert());
      }, 6000);
      dispatch(updateProducts());
    } else {
      dispatch(setAlert({ alert: res.error[0], type: "error" }));
      setTimeout(function () {
        dispatch(clearAlert());
      }, 6000);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const prep = {
      name: data.get("name"),
      price: data.get("price"),
      desc: data.get("desc"),
      // images: data.get('images')
    };
    setSubmitting(true);
    const res = await put(prep, `products/${picked[0].uuid}`);
    if (res.message === "Data recorded succefully") {
      dispatch(
        setAlert({ alert: "Product Updated Succefully", type: "success" })
      );
      myForm.current.reset();
      setTimeout(function () {
        dispatch(clearAlert());
      }, 6000);
      dispatch(updateProducts());
    } else {
      console.log(res);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

  console.log(file)
  return (
    <Box
      ref={myForm}
      component="form"
      onSubmit={picked === undefined ? handleSubmit : handleEdit}
      sx={{ display: "flex", flexWrap: "wrap", p: 4, justifyContent: "center" }}
    >
      <Box sx={{ textAlign: "center", width: "100%", mb: 2 }}>
        <Typography
          variant="h5"
          component="h5"
          color="teal"
          sx={{ fontWeight: 600, fontSize: "19px" }}
        >
          {picked === undefined ? "Create A New Product" : "Edit Product"}
        </Typography>
      </Box>
      <div style={{ textAlign: "center" }}>
        <TextField
          defaultValue={picked !== undefined ? picked[0].name : null}
          required
          name="name"
          label="Product Name"
          id="outlined-required"
          size="small"
          sx={{ m: 1, width: "40%" }}
        />
        <TextField
          id="outlined-required"
          type="number"
          defaultValue={picked !== undefined ? picked[0].price : null}
          required
          name="price"
          label="Product Price"
          size="small"
          sx={{ m: 1, width: "40%" }}
        />
        <TextField
          id="outlined-required"
          defaultValue={picked !== undefined ? picked[0].desc : null}
          required
          fullWidth
          name="desc"
          label="Product Description"
          size="small"
          sx={{ mt: 2 }}
        />
        <Typography
          variant="body2"
          color="#494949"
          sx={{ mt: 2, fontSize: "13px" }}
        >
          Upload Product Image
        </Typography>
        {/* <ImageUpload /> */}
        <TextField
        onChange={(e) => setFile(e.target.files[0])}
        name="images"
          type="file"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />

        <Divider light />
        <Button
          ref={submitBtn}
          type="submit"
          variant="contained"
          sx={{
            width: 200,
            textTransform: "capitalize",
            mt: 3,
            mb: 2,
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
