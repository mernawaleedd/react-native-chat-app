import React, { useState } from "react";
import Login from "./components/Login";
import GlobalProvider from "../context/GlobalProvider";

export default function Index() {

  return (
    <GlobalProvider>
      <Login/>
    </GlobalProvider>
    // <DatabaseChat/>
    // <DropdownsPage/>
    // <TablePage/>
  );
}
