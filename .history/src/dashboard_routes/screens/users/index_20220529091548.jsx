import React from "react";
import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import ManageUser from "./ManageUser";

const index = () => {
  return (
    <Routes>
      <Route path="/"  index element={<Users />} />
        <Route path="manageUser" element={<ManageUser />}>
          <Route path=":uuid" element={<ManageUser />} />
        </Route>
    </Routes>
  );
};

export default index;
