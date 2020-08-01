import React, { useEffect } from "react";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { Input, Button } from "react-rainbow-components";
import { Page } from "../common-components";
import { useAuth } from "../auth";
import { useState } from "react";

const Login = () => {
  const { setTokens, authTokens } = useAuth();
  const [users, setUsers] = useState([]);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isUserLoggedIn, setUserLogin] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = (e) => {
    e.preventDefault();
    const findUser = users.find(
      (user) => user.userName === loginName && user.password === loginPassword
    );
    if (findUser && findUser.id) {
      setTokens(findUser);
      setUserLogin(true);
    } else {
      alert("invalid username or password");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:3000/users`)
        .then((res) => res.json())
        .catch((e) => console.log(e));
      console.log(res);
      setUsers(res);
    };

    fetchUsers();
  }, []);

  if (isUserLoggedIn || (authTokens && authTokens.id)) {
    return <Redirect to="/home" />;
  }

  const setTheLoginName = (e) => {
    const { value } = e.target;
    setLoginName(value);
  };

  const setTheLoginPassword = (e) => {
    const { value } = e.target;
    setLoginPassword(value);
  };

  return (
    <Page className="login-page">
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <Input
          label="Username"
          required
          className="text-input login-username"
          style={{ padding: "20px", paddingLeft: "0" }}
          value={loginName}
          onChange={setTheLoginName}
        />
        <Input
          label="Enter the password"
          required
          type="password"
          className="text-input login-password"
          style={{ padding: "20px", paddingLeft: "0" }}
          value={loginPassword}
          onChange={setTheLoginPassword}
        />
        <Button label="Login" type="submit" />
      </form>
      <div className="login-do-not-have-account">
        <Link to="/signup">Don't have an account</Link>
      </div>
    </Page>
  );
};

export default Login;
