import React from "react";
import { Route, Routes } from "react-router-dom";
// import ProtectManageProduct from "./ProtectManageProduct";
import Main from "./Main";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      {/* <Route element={<ProtectManageProduct />}> */}
        {/* <Route path="manageProduct" element={<ManageProduct />}> */}
          {/* <Route path=":uuid" element={<ManageProduct />} /> */}
        {/* </Route> */}
      {/* </Route> */}
    </Routes>
  );
};

export default index;