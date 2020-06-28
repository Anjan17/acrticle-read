import React, { Fragment } from "react";
import { Switch, Route, useRouteMatch, Link } from "react-router-dom";
import Logout from "./Logout";

const ArticlesPage = ({ children, ...rest }) => {
  const { url, path } = useRouteMatch();
  return (
    <Fragment>
      <ul>
        {children.map((child) => (
          <li>
            <Link to={`${url}/${child.props.id}`}>{child.props.id}</Link>
          </li>
        ))}
      </ul>
      <Switch>
        {children.map((Child) => (
          <Route exact path={`${url}/${Child.props.id}`}>
            <Child.type {...Child.props} />
          </Route>
        ))}
      </Switch>
      <Logout />
    </Fragment>
  );
};

const Article = ({ id }) => <div>{`This is the article ${id}`}</div>;
export { ArticlesPage, Article };
