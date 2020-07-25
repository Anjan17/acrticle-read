import React, { Fragment } from "react";
import { useAuth } from "../auth";
import Logout from "./Logout";

const TopNavBar = ({ children }) => {
  const { authTokens } = useAuth();
  return (
    <div className="top-nav-bar">
      <Fragment>
        {children}
        {authTokens ? <Logout /> : null}
      </Fragment>
    </div>
  );
};

export default TopNavBar;
