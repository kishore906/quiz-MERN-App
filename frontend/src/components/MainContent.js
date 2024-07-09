import React from "react";
import "./mainContent.css";
import { Outlet } from "react-router-dom";

function MainContent() {
  return (
    <section className="mainContentSection">
      <Outlet />
    </section>
  );
}

export default MainContent;
