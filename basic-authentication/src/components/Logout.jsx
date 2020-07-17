import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";
import classnames from "classnames";
import { Button } from "react-rainbow-components";
import { useAuth } from "../auth";

const Logout = () => {
  const [userLoggedOut, setUserLogout] = useState(false);
  const { setTokens, authTokens } = useAuth();
  const onClick = () => {
    // remove all the tokens
    // redirect to login page
    setTokens(null);
    setUserLogout(true);
  };

  if (userLoggedOut) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="logout-content">
      <div className="logged-in-as-text">{`Logged in as ${authTokens.userName}`}</div>
      <Button
        variant="outline-brand"
        className={classnames("rainbow-m-around_medium", "logout-button")}
        label="Logout"
        onClick={onClick}
      />
    </div>
  );
};

export default Logout;
