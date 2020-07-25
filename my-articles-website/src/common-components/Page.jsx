import React from "react";
import classnames from "classnames";
import { Card } from "react-rainbow-components";

const Page = ({ children, className }) => (
  <Card className={classnames("page", className)}>{children}</Card>
);

export default Page;
