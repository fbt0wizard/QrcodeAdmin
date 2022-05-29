import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import ManageUser from "./ManageUser";
import ProtectManageUsers from "./ProtectManageUsers";

const index = () => {
  return (
    <Routes>
      <Route path="/"  index element={<Users />} />
      <Route element={<ProtectManageUsers />}>
        <Route path="manageUser" element={<ManageUser />}>
          <Route path=":uuid" element={<ManageUser />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default index;
