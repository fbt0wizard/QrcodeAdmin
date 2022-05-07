import React from "react";
import { Route, Routes } from "react-router-dom";
// import ProtectManageProduct from "./ProtectManageProduct";
import Settings from "./Settings";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Settings />} />
      {/* <Route element={<ProtectManageProduct />}> */}
        {/* <Route path="manageProduct" element={<ManageProduct />}> */}
          {/* <Route path=":uuid" element={<ManageProduct />} /> */}
        {/* </Route> */}
      {/* </Route> */}
    </Routes>
  );
};

export default index;