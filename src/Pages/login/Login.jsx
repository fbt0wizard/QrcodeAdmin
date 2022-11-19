import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { FaHospital } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { func } from "../../functions";
import { post } from "../../functions/apiCalls";
import { AlertForDelete } from "../../components/Alerts";

const Login = () => {
  const submitBtn = useRef(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(false)


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false)
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("email"),
      password: data.get("password"),
      type: "admin"
    };
    setSubmitting(true)
    submitBtn.current.disabled = true
    const res = await post(body, "authenticate");
    if (res.status === 200) {
      func.setStorage("token", res.token);
      func.setStorageJson("user", res.data);
      func.setUserInfoToStore(res.data, dispatch);
        setSubmitting(false);
        submitBtn.current.disabled = false
      navigate("/");
    } else if(res.status === 400) {
      setSubmitting(false);
      submitBtn.current.disabled = false
      setError(true)
    }else {
        setSubmitting(false);
        console.log(res)
        submitBtn.current.disabled = false
    }
  };


  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(assets/images/formimg.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#5c9499" }}>
            <FaHospital />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome Back!
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              size="small"
              id="outlined-required"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="off"
              autoFocus
            />
            <TextField
              size="small"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              // id="outlined-required"
              autoComplete="off"
            />
            <Button
              ref={submitBtn}
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#5c9499",
                "&:hover": {
                  bgcolor: "#387075",
                },
              }}
            >
              {submitting ? (
                <i style={{marginRight: 5}} className="fa fa-spinner fa-spin" aria-hidden="true"></i>
              ) : (
                null
              )} Login
            </Button>
            {error ? <AlertForDelete type="error" alert="invalid Credentials"/> : null}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        QR ADMIN
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
