import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button, Divider, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { post } from "../../../../functions/apiCalls";
import { useDispatch } from "react-redux";
import { updateProducts } from "../../../../redux_toolkit/slices/dataSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import DeleteIcon from "@mui/icons-material/Delete";

const Input = styled("input")({
  display: "none",
});

export default function CreateProduct({ picked, setModal }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submitBtn = useRef(null);
  const myForm = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [base64img, setBase64Img] = useState();
  const [imgfile, setImgFile] = useState(null)

  useEffect(() => {
    if(picked) {
      setBase64Img(picked.images)
    }
  },[]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(imgfile !== null) {
      data.append("images", imgfile)
    }

    setSubmitting(true);
    submitBtn.current.disabled = true;
    const res = await post(data, "products", true);

    if (res.message === "Data recorded succefully") {
      myForm.current.reset();
      dispatch(updateProducts());
      setModal(false)
      toast.success("Product created succefully!");
    } else {
      toast.error(`${res.error[0]}!`);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if(imgfile !== null) {
      data.append("images", imgfile)
    }

    setSubmitting(true);
    const res = await post(
      data,
      `products/${picked.uuid}?_method=PUT`,
      true
    );
    if (res.message === "Data recorded succefully") {
      myForm.current.reset();
      toast.success("Product updated succefully!");
      dispatch(updateProducts());
      setModal(false);
      navigate(-1);
    } else {
      toast.error(`${res.error[0]}!!!`);
      console.log(res);
    }
    setSubmitting(false);
    submitBtn.current.disabled = false;
  };

  const handleChange = (e) => {
    let file = e.target.files[0];
    setImgFile(file)
    let reader = new FileReader();
    reader.onloadend = function () {
      setBase64Img(reader.result);
    };
    reader.readAsDataURL(file);
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
          defaultValue={picked !== undefined ? picked.name : null}
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
          defaultValue={picked !== undefined ? picked.price : null}
          required
          name="price"
          label="Product Price"
          size="small"
          sx={{ m: 1, width: "40%" }}
        />
        <TextField
          disabled={submitting}
          id="outlined-required"
          defaultValue={picked !== undefined ? picked.desc : null}
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

        <label htmlFor="icon-button-file">
          <Input
            accept="image/*"
            id="icon-button-file"
            type="file"
            onChange={handleChange}
          />
          <IconButton
            disabled={submitting}
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        {base64img && (
            <>
              <img className="__preview_img" src={base64img} alt="" />
              <IconButton aria-label="delete" size="small" 
              onClick={() => {
                setBase64Img("") 
                setImgFile(null)
              }}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </>
          )}

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
