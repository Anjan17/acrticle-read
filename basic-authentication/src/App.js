import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "react-rainbow-components";
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
import { TopNavBar } from "./components";
import { authContext as AuthContext } from "./auth";
import "./App.css";

function App() {
  const existingTokens = localStorage.getItem("id");
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data) => {
    if (data) {
      localStorage.setItem("id", data);
      setAuthTokens(data);
    } else {
      localStorage.removeItem("id");
      setAuthTokens();
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, setTokens }}>
      <Router>
        <TopNavBar>
          <div className="tabs">
            <Button className="tab-element">
              <Link to="/home">Home</Link>
            </Button>
            <Button className="tab-element">
              <Link to="/about">About</Link>
            </Button>
            <Button className="tab-element">
              <Link to="/articles">Articles</Link>
            </Button>
          </div>
        </TopNavBar>
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
              <Article id={1} key="article-1" />
              <Article id={2} key="article-2" />
              <Article id={3} key="article-3" />
              <Article id={4} key="article-4" />
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
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
