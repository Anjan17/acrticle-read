import React, { Fragment } from "react";
import Logout from "./Logout";

const ProtectedPage = () => (
  <Fragment>
    <div>This is the protected page</div>
    <Logout />
  </Fragment>
);
export default ProtectedPage;
