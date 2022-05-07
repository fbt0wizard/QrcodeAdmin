import React from "react";
import { Route, Routes } from "react-router-dom";
import ManageProduct from "./ManageProduct";
import Products from "./Products";
import ProtectManageProduct from "./ProtectManageProduct";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route element={<ProtectManageProduct />}>
        <Route path="manageProduct" element={<ManageProduct />}>
          <Route path=":uuid" element={<ManageProduct />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default index;
