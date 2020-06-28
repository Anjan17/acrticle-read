import React, { Fragment } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import { useState } from "react";

const Login = () => {
  const { setTokens } = useAuth();
  const [isUserLoggedIn, setUserLogin] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = () => {
    setTokens("kbkbkbk");
    setUserLogin(true);
  };
  if (isUserLoggedIn) {
    return <Redirect to="/home" />;
  }

  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label>Login</label>
        <input
          className="login-username"
          placeholder="Enter the email address"
        />
        <input className="login-pasword" placeholder="Enter the password" />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account</Link>
    </Fragment>
  );
};

export default Login;
