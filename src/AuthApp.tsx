import React, { FC } from "react";
import Home from "./components/home/Home";
import { Switch, Route, useHistory } from "react-router";
import { LoginCallback, Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import Profile from "./components/profile/Profile";
import DashBoard from "./components/dashboard/DashBoard";
import { AuthConstants } from "./utils/constants";
import AuthRoute from "./utils/AuhtRoute";
import UnAuthorized from "./components/unauthorized/UnAuthorized";
import { AuthContextProvider } from "./context/auth-context";
import "./index.scss";
import { AuthConfig } from "./index";

const AuthApp: FC<AuthConfig> = (props) => {
  const oktaConfig =
    props.config != null && props.config != undefined
      ? new OktaAuth(props.config)
      : new OktaAuth(AuthConstants.config);

  AuthConstants.roles.ADMIN_ROLE = props?.roles?.ADMIN_GROUP
    ? props.roles.ADMIN_GROUP
    : AuthConstants.roles.ADMIN_ROLE;

  AuthConstants.roles.USER_ROLE = props?.roles?.USER_GROUP
    ? props.roles.USER_GROUP
    : AuthConstants.roles.USER_ROLE;

  AuthConstants.postAuthRedirectURI = props?.postAuthRedirectPage
    ? props?.postAuthRedirectPage
    : AuthConstants.postAuthRedirectURI;

  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };
  return (
    <Security oktaAuth={oktaConfig} restoreOriginalUri={restoreOriginalUri}>
      <AuthContextProvider>
        <Switch>
          <Route path="/login/callback" exact component={LoginCallback} />
          <Route path="/" exact>
            <Home />
          </Route>
          <AuthRoute
            path="/profile"
            component={Profile}
            roles={[AuthConstants.roles.USER_ROLE, AuthConstants.roles.ADMIN_ROLE]}
          ></AuthRoute>
          <AuthRoute
            path="/dashboard"
            component={DashBoard}
            roles={[AuthConstants.roles.ADMIN_ROLE]}
          ></AuthRoute>
          <Route path="/unauthorized" component={UnAuthorized} />
        </Switch>
      </AuthContextProvider>
    </Security>
  );
};

export default AuthApp;
