import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Tittle from "../../../components/Tittle";
import MiniNavScreen from "../../../components/MiniNavScreen";
import Grid from "@mui/material/Grid";
import UserBadge from "../../../components/UserBadge";
import UserControl from "./components/UserControl";
// import { axiosGet } from "../../../functions/apiCalls";

const ManageUser = () => {
  let { uuid } = useParams();
  const { users } = useSelector((state) => state.data);
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
          // justifyContent: "space-between",
        }}
      >
        <Grid
          item
          xs={12}
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
          xs={12}
          sx={{
            width: "max-content",
            // boxShadow: 1,
            borderRadius: 2,
            // bgcolor: "#fff",
            height: "max-content",
          }}
        >
          {/* user control action */}
          <UserControl pickedUser={pickedUser[0]}/>
        </Grid>
      </Grid>
      {/* <div> id is {uuid}</div> */}
    </React.Fragment>
  );
};

export default ManageUser;
