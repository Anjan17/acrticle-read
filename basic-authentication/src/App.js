import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import {
  HomePage,
  About,
  Articles,
  Article,
  ProtectedPage,
  Login,
  Signup,
} from "./pages";
import PrivateRoute from "./PrivateRoute";
import { authContext as AuthContext } from "./auth";
import "./App.css";

function App() {
  const existingTokens = localStorage.getItem("tokens");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens }}>
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/articles">Articles</Link>
            </li>
          </ul>
          <Switch>
            <PrivateRoute exact path="/protected">
              <ProtectedPage />
            </PrivateRoute>
            <PrivateRoute exact path="/home">
              <HomePage />
            </PrivateRoute>
            <Route path="/about">
              <About />
            </Route>
            <PrivateRoute path="/articles">
              <Articles>
                <Article id={1} />
                <Article id={2} />
                <Article id={3} />
                <Article id={4} />
              </Articles>
            </PrivateRoute>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
