import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "react-rainbow-components";
import Page from "../components/Page";
import axios from "axios";
import { useAuth } from "../auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [isUserSignedUp, setUserSignUp] = useState(false);
  const [users, setUsers] = useState([]);
  const { setTokens } = useAuth();

  const onSubmit = async () => {
    const doesUserExistAlready = users.find((user) => user.email === email);
    console.log("onSubmit called");
    // make an API call through the details
    // If the api return 200, then successfully logged in else error while logging in
    // if success, send back and update the user token and redirect to the home page
    // try {
    //   const response = await axios.post(
    //     "https://www.somePlace.com/auth/signup",
    //     { name, email, password }
    //   );
    //   console.log("made the api call", response);
    // const res = await Promise.resolve("sfsfsfs");
    //   if (response.status === 200) {
    if (!doesUserExistAlready) {
      setUserSignUp(true);
      setTokens("sdfsfeffw");
    } else {
      alert("A user already exists with the registered email");
    }
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  const onInvalid = () => {
    alert("entries invalid");
  };
  const retypePasswordHander = (e) => {
    const value = e.target.value;
    setRetypePassword(value);
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

  if (isUserSignedUp) {
    return <Redirect to="/" />;
  }
  return (
    <Page className="signup-page">
      <h1>Sign Up</h1>
      <form onSubmit={onSubmit} onInvalid={onInvalid}>
        <Input
          label="Name"
          className="text-input signup-username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          label="Email Id"
          className="text-input signup-email-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          className="text-input signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          className="text-input signup-password-retype"
          type="password"
          label="Retype Password"
          bottomHelpText={
            retypePassword !== password ? "Passwords do not match" : ""
          }
          invalid={retypePassword !== password}
          onChange={retypePasswordHander}
          required
        />
        <Button type="submit" className="signup-btn" label="Sign Up !" />
      </form>
      <div className="already-have-account-link">
        <Link to="/login">Already have an account</Link>
      </div>
    </Page>
  );
};

export default Signup;
