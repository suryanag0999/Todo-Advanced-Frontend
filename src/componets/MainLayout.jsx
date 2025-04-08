import React from "react";
import Header from "./Header";
import CopyrightNotice from "./CopyrightNotice";

export default function MainLayout({ showHeader = true, children }) {
  return (
    <div className="layout-container-div">
      {/* header */}
     { showHeader && <Header />}
      {/* footer */}
      {children}
      <CopyrightNotice />
    </div>
  );
}
