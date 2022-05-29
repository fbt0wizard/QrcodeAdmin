import React from "react";
import Tittle from "../../../components/Tittle";
import Grid from "@mui/material/Grid";
import UserBadge from "./components/UserBadge";
import UserControl from "./components/UserControl";
import { ToastContainer } from "react-toastify";
import { func } from "../../../functions";
// import { axiosGet } from "../../../functions/apiCalls";

const ManageUser = () => {

  const pickedUser = func.getStorageJson("persistUser")


  return (
    <React.Fragment>
      <Tittle>Manage User</Tittle>
      <Grid
        maxWidth="lg"
        sx={{
          p: 1,
          display: "flex",
          // justifyContent: "space-between",
        }}
      >
        <Grid
          item
          xs={6}
          sx={{
            width: "max-content",
            borderRadius: 2,
            height: "max-content",
          }}
        >
          {/* user badge */}
          <UserBadge pickedUser={pickedUser}/>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            width: "100%",
            height: "max-content",
          }}
        >
          {/* user control action */}
          <UserControl pickedUser={pickedUser}/>
        </Grid>
      </Grid>
      {/* <div> id is {uuid}</div> */}
      <ToastContainer />
    </React.Fragment>
  );
};

export default ManageUser;
