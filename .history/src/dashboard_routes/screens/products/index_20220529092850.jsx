import React from "react";
import { Route, Routes } from "react-router-dom";
import ManageProduct from "./ManageProduct";
import Products from "./Products";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
        <Route path="manageProduct" element={<ManageProduct />}>
          <Route path=":uuid" element={<ManageProduct />} />
        </Route>
    </Routes>
  );
};

export default index;
