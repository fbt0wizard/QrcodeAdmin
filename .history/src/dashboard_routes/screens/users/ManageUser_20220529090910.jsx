import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Tittle from "../../../components/Tittle";
import Grid from "@mui/material/Grid";
import UserBadge from "./components/UserBadge";
import UserControl from "./components/UserControl";
import { ToastContainer } from "react-toastify";
// import { axiosGet } from "../../../functions/apiCalls";

const ManageUser = () => {
  let { uuid } = useParams();
  const { users } = useSelector((state) => state.data);
  console.log(users)
  // const { alert, alertType, deleteAlert } = useSelector((state) => state.alert);

  var pickedUser = users.filter(function (item) {
    return item.uuid === uuid;
  });

  useEffect(() => {
    // const payload = {

    // };

    // axiosGet("points", payload, false).then((res) => {
    //   console.log(res)
    // })

  },[]);


  return (
    <React.Fragment>
      <Tittle>Manage User</Tittle>
      <Grid
        maxWidth="lg"
        sx={{
          p: 1,
          display: "flex",
          width: "100%",
          // justifyContent: "space-between",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            borderRadius: 2,
            height: "max-content",
            width: "30%",
            minWidth: "max-content",
            maxWidth: "max-content",
          }}
        >
          {/* user badge */}
          <UserBadge pickedUser={pickedUser}/>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            width: "70%",
            borderRadius: 2,
            height: "max-content",
          }}
        >
          {/* user control action */}
          <UserControl pickedUser={pickedUser[0]}/>
        </Grid>
      </Grid>
      {/* <div> id is {uuid}</div> */}
      <ToastContainer />
    </React.Fragment>
  );
};

export default ManageUser;
