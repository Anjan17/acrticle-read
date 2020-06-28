import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./auth";

const PrivateRouter = ({ children, ...rest }) => {
  const { authTokens } = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        return authTokens && authTokens.length ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
};

export default PrivateRouter;
