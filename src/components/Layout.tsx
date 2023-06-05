import React from "react";
import Navbar from "./Navbar/Navbar";

function Layout({ children }: { children: any }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}

export default Layout;
