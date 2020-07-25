import React, { useState, useEffect } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "react-rainbow-components";
import {
  HomePage,
  About,
  Articles,
  ArticleDetail,
  Login,
  Signup,
} from "./pages";
import PrivateRoute from "./PrivateRoute";
import { TopNavBar } from "./common-components";
import { authContext as AuthContext } from "./auth";
import "./App.css";

function App() {
  const existingTokens = localStorage.getItem("user");
  const [authTokens, setAuthTokens] = useState(JSON.parse(existingTokens));

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setAuthTokens(data);
    } else {
      localStorage.removeItem("user");
      setAuthTokens();
    }
  };

  useEffect(() => {
    // TODO: To invalidate the user token and clear the local storage of an user details
    // The below code is written with the intention to make the same work but it isn't working

    // return function clearAllUserData() {
    //   setTokens(null);
    //   localStorage.removeItem("user");
    // };
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setTokens }}>
      <Router>
        <TopNavBar>
          <div className="tabs">
            <Button className="tab-element" variant="border">
              <Link to="/home">Home</Link>
            </Button>
            <Button className="tab-element" variant="border">
              <Link to="/about">About</Link>
            </Button>
            <Button className="tab-element" variant="border">
              <Link to="/articles">Articles</Link>
            </Button>
          </div>
        </TopNavBar>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute exact path="/home">
            <HomePage />
          </PrivateRoute>
          <Route path="/about">
            <About />
          </Route>
          <PrivateRoute path="/articles/:id">
            <ArticleDetail />
          </PrivateRoute>
          <PrivateRoute path="/articles">
            <Articles />
          </PrivateRoute>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
