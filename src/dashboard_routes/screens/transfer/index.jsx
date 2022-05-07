import React from "react";
import { Route, Routes } from "react-router-dom";
import Transfer from "./Transfer";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Transfer />} />
    </Routes>
  );
};

export default index;