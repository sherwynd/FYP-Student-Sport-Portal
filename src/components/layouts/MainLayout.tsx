import React, { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import NavBar from "./NavBar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
