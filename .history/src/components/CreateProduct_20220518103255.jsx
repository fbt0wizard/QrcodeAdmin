import React, { useState, useRef } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { post } from "../functions/apiCalls";
import { useDispatch } from "react-redux";
import { updateProducts } from "../redux_toolkit/slices/dataSlice";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

export default function CreateProduct({ picked, setModal }) {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const submitBtn = useRef(null);
  const myForm = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSubmitting(true);
    submitBtn.current.disabled = true;
    const res = await post(data, 'products', true);

    if (res.message === "Data recorded succefully") {
      myForm.current.reset();
      dispatch(updateProducts());
      toast.success("Product created succefully!")
      setModal(false)
      navigate(-1)
    } else {
      toast.error(`${res.error[0]}!!!`)
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
    
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setSubmitting(true);
    const res = await post(data, `products/${picked[0].uuid}?_method=PUT`, true);
    if (res.message === "Data recorded succefully") {
      myForm.current.reset();
      toast.success("Product updated succefully!")
      dispatch(updateProducts());
      setModal(false)
      navigate(-1)
    } else {
      toast.error(`${res.error[0]}!!!`)
      console.log(res);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

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
          disabled={submitting}
          defaultValue={picked !== undefined ? picked[0].name : null}
          required
          name="name"
          label="Product Name"
          id="outlined-required"
          size="small"
          sx={{ m: 1, width: "40%" }}
        />
        <TextField
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
          type="file"
          name="images"
          variant="outlined"
          sx={{
            mb: 2,
          }}
        />

        <Divider light />
        <Button
          disabled={submitting}
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
    </Box>
  );
}
