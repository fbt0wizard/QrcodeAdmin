import React, { useState, useRef } from "react";
import { Box, Typography, Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AlertSuccess } from "./Alerts";
import { post, put } from "../functions/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { clearAlert, setAlert } from "../redux_toolkit/slices/alertSlice";
import { updateProducts } from "../redux_toolkit/slices/dataSlice";
// import ImageUpload from "./ImageUpload"

export default function CreateProduct({ picked }) {
  const dispatch = useDispatch();
  const submitBtn = useRef(null);
  const myForm = useRef(null);
  const [submitting, setSubmitting] = useState(false);
  const [file, setFile] = useState()

  const { alert, alertType } = useSelector((state) => state.alert);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(myForm.current)
    const data = new FormData(myForm.current);
    // const prep = {
    //   name: data.get("name"),
    //   price: data.get("price"),
    //   desc: data.get("desc"),
    //   images: data.get("images"),
    // };
    console.log(data.get("name"))
    setSubmitting(true);
    submitBtn.current.disabled = true;
    const res = await post(data, "products");
    console.log(res)
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

  const handleChange = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }

  return (
    <div>
    <form ref={myForm} enctype="multipart/form-data">
        <input type="text" name="name" />
        <input type="number" name="price" />
        <input type="text" name="desc" />
        <input type="file" name="images" />
    
        <input type="submit" />
    </form>
</div>

    
  );
}
