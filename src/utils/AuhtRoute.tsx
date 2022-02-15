import React, { FC } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthConstants } from "./constants";

const AuthRoute: FC<{ component: React.FC; path: string; exact?: boolean; roles: string[] }> = (
  props
) => {
  const oktaToken = JSON.parse(localStorage.getItem("okta-token-storage") || "{}");
  const oktaGroups: string[] = oktaToken?.accessToken?.claims?.group;
  const currentUserRole = oktaGroups?.includes(AuthConstants.roles.ADMIN_ROLE)
    ? AuthConstants.roles.ADMIN_ROLE
    : AuthConstants.roles.USER_ROLE;

  const reqRole = props.roles.includes(currentUserRole);

  return oktaToken?.accessToken && reqRole ? (
    <Route exact={props.exact} path={props.path} component={props.component} />
  ) : (
    <Redirect
      to={{
        pathname: oktaToken?.accessToken ? "/unauthorized" : "/",
      }}
    />
  );
};

export default AuthRoute;
