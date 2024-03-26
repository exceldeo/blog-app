import React from "react";
import Footer from "../Shared/Footer";
import Header from "../Shared/Header";
import { Container } from "@mui/system";

const MainLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <Container
        sx={{
          marginTop: "80px",
          minHeight: "calc(100vh - 160px)",
        }}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};

export default MainLayout;
