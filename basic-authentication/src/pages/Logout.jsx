import React, { useState } from "react";
import { Redirect } from "react-router-dom";
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
    <button className="logout-button" onClick={onClick}>
      Logout
    </button>
  );
};

export default Logout;
