import React, { useState, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isUserSignedUp, setUserSignUp] = useState(false);
  const { setTokens } = useAuth();

  const onSubmit = async () => {
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
    setUserSignUp(true);
    setTokens("sdfsfeffw");
    //   }
    // } catch (e) {
    //   console.error(e);
    // }
  };

  if (isUserSignedUp) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <form onSubmit={onSubmit}>
        <label>Name:</label>
        <input
          className="signup-username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email Id:</label>
        <input
          className="signup-email-id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="signup-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Retype Password</label>
        <input className="signup-password-retype" type="password" />
        <button type="submit">Sign Up !</button>
      </form>
      <Link to="/login">Already have an account</Link>
    </Fragment>
  );
};

export default Signup;
