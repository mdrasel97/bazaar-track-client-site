import React from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }) => {
  const authInfo = {
    name: "rasel",
    email: "mollrasel972@gmail.com",
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
