import React from "react";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="container">{children}</div>
      <Footer />
    </div>
  );
};

export default MainLayout;
