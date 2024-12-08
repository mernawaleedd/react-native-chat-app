import React, { useState } from "react";
import Login from "./Login";
import GlobalProvider from "../context/GlobalProvider";

export default function App() {

  return (
    <GlobalProvider>
      <Login/>
    </GlobalProvider>
    // <DatabaseChat/>
    // <DropdownsPage/>
    // <TablePage/>
  );
}
