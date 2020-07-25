import React from "react";
import { useAuth } from "../auth";
import { Page } from "../common-components";
import * as url from "../assets/images/profile-boy.png";

const HomePage = () => {
  const { authTokens } = useAuth();
  const {
    userName,
    name: { firstName, lastName },
  } = authTokens;
  return (
    <Page className="user-page">
      <div className="profile-data">
        <div className="avatar">
          <img className="avatar-image" src={url} />
        </div>
        <div className="username">{userName}</div>
        <div className="full-name">{`${firstName} ${lastName}`}</div>
      </div>
      <div className="miscellaneous">This is the miscellaneous data</div>
    </Page>
  );
};

export default HomePage;
