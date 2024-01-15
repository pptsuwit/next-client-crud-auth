import React, { PropsWithChildren } from "react";
import Navbar from "./Navbar";
const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
    </>
  );
};
export default AuthLayout;
