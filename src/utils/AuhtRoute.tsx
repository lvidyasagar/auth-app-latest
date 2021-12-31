import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { getLoginType, getUser, LoginType } from "./localstorage.helper";
import * as Constants from "./constants";

const AuthRoute: FC<{ component: React.FC; path: string; exact?: boolean; roles: string[] }> = (
  props
) => {
  let oktaToken, currentUserRole;
  if (getLoginType() === LoginType.Okta) {
    oktaToken = JSON.parse(localStorage.getItem("okta-token-storage") || "{}");
    let oktaGroups: string[] = oktaToken?.accessToken?.claims?.group;
    currentUserRole = oktaGroups?.includes(Constants.ADMIN_ROLE)
      ? Constants.ADMIN_ROLE
      : Constants.USER_ROLE;
  } else {
    currentUserRole = getUser()?.role;
  }

  const reqRole = props.roles.includes(currentUserRole);

  return (oktaToken?.accessToken || getUser()?.token) && reqRole ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect
      to={{
        pathname: "/unauthorized",
      }}
    />
  );
};

export default AuthRoute;
