import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import classnames from "classnames";
import { Button } from "react-rainbow-components";
import { useAuth } from "../auth";

const Logout = () => {
  const [userLoggedOut, setUserLogout] = useState(false);
  const { setTokens } = useAuth();
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
    <Button
      variant="outline-brand"
      className={classnames("rainbow-m-around_medium", "logout-button")}
      label="Logout"
      onClick={onClick}
    />
  );
};

export default Logout;
