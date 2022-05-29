import React from "react";
import Tittle from "../../../components/Tittle";
import Grid from "@mui/material/Grid";
import UserBadge from "./components/UserBadge";
import UserControl from "./components/UserControl";
import { ToastContainer } from "react-toastify";
import { func } from "../../../functions";
import { Box } from "@mui/material";
// import { axiosGet } from "../../../functions/apiCalls";

const ManageUser = () => {

  const pickedUser = func.getStorageJson("persistUser")


  return (
    <React.Fragment>
      <Tittle>Manage User</Tittle>
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3} sx={{minWidth: "300px"}}>
          {/* user badge */}
          <UserBadge pickedUser={pickedUser}/>
        </Grid>
        <Grid item xs={8}>
          {/* user control action */}
          <UserControl pickedUser={pickedUser}/>
        </Grid>
        </Grid>
      </Box>
      {/* <div> id is {uuid}</div> */}
      <ToastContainer />
    </React.Fragment>
  );
};

export default ManageUser;