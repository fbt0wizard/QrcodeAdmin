import React from "react";
import Tittle from "../../../components/Tittle";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import ProductBadge from "./components/ProductBadge";
import ProductControl from "./components/ProductControl";
import { AlertForDelete } from "../../../components/Alerts";
import { func } from "../../../functions";
const ManageProduct = () => {

  const { alert, alertType, deleteAlert } = useSelector((state) => state.alert);

  const picked = func.getStorageJson("persistProduct")

  return (
    <React.Fragment>
      <Tittle>Manage Product</Tittle>
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
          <ProductBadge picked={picked} />
        </Grid>
        
        <Grid
          item
          xs={12}
          sx={{
            width: "100%",
            height: "max-content",
          }}
        >
          <ProductControl picked={picked} />
        </Grid>
      </Grid>
      {deleteAlert && <AlertForDelete alert={alert} type={alertType} />}
    </React.Fragment>
  );

};

export default ManageProduct;
