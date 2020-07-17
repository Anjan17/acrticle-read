import React, { useState } from "react";
import { Switch, Route, BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "react-rainbow-components";
import {
  HomePage,
  About,
  Articles,
  ArticleDetail,
  ProtectedPage,
  Login,
  Signup,
} from "./pages";
import PrivateRoute from "./PrivateRoute";
import { TopNavBar } from "./components";
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
          <PrivateRoute exact path="/protected">
            <ProtectedPage />
          </PrivateRoute>
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
