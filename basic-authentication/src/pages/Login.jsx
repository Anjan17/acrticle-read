import React, { Fragment } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Card, Input } from "react-rainbow-components";
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
    <Card className="login-page">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Input
          label="Email"
          required
          className="login-username"
          style={{ padding: "20px", paddingLeft: "0" }}
        />
        <Input
          label="Enter the password"
          required
          type="password"
          className="login-password"
          style={{ padding: "20px", paddingLeft: "0" }}
        />
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account</Link>
    </Card>
  );
};

export default Login;
