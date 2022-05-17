import React from "react";
import Tittle from "../../../components/Tittle";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductBadge from "../../../components/ProductBadge";
import ProductControl from "../../../components/ProductControl";
import { AlertForDelete } from "../../../components/Alerts";
const ManageProduct = () => {
  let { uuid } = useParams();
  const { products } = useSelector((state) => state.data);
  const { alert, alertType, deleteAlert } = useSelector((state) => state.alert);


  var picked = products.filter(function (item) {
    return item.uuid === uuid;
  });

  return (
    <React.Fragment>
      <Tittle>Manage Product</Tittle>
      <Grid
        maxWidth="lg"
        sx={{
          p: 1,
          display: "flex",
          justifyContent: "space-between",
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
            width: "max-content",
            boxShadow: 1,
            borderRadius: 2,
            bgcolor: "#fff",
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
