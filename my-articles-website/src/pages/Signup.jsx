import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { Input, Button } from "react-rainbow-components";
import { Page } from "../common-components";
// import axios from "axios";
import { useAuth } from "../auth";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [users, setUsers] = useState([]);
  const { authTokens, setTokens } = useAuth();
  const [submitButtonDisable, setSubmitButtonDisable] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonDisable(true);
    const doesUserExistAlready = users.find((user) => user.email === email);
    if (!doesUserExistAlready) {
      const [firstName, ...lastName] = name.split(" ");
      const userPayload = {
        name: {
          firstName,
          lastName: lastName[0] || "",
        },
        userName: firstName,
        password,
        email,
      };
      // make an API call to update the user details
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userPayload),
        });
        const data = await response.json();
        if (data.id) {
          setTokens(data);
          // setUserSignUp(true);
        }
      } catch (e) {
        console.err(e);
      }
    } else {
      alert("A user already exists with the registered email");
    }
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
      try {
        const res = await fetch(`http://localhost:3000/users`);
        const data = await res.json();
        setUsers(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchUsers();
  }, []);

  if (authTokens) {
    return <Redirect to="/home" />;
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
          autoFocus
        />
        <Input
          label="Email Id"
          className="text-input signup-email-id"
          type="email"
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
        <Button
          type="submit"
          className="signup-btn"
          label="Sign Up !"
          disabled={submitButtonDisable}
        />
      </form>
      <div className="already-have-account-link">
        <Link to="/login">Already have an account</Link>
      </div>
    </Page>
  );
};

export default Signup;
