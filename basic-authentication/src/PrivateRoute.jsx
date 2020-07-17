import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./auth";

const PrivateRouter = ({ children, ...rest }) => {
  const { authTokens } = useAuth();
  if (!(authTokens && authTokens.id)) {
    alert("You need to login to view the page");
  }
  return (
    <Route
      {...rest}
      render={() => {
        return authTokens && authTokens.id ? children : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRouter;
