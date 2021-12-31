import React from "react";
import Home from "./components/home/Home";
import { Switch, Route, useHistory } from "react-router";
import { LoginCallback, Security } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { config } from "./environments/environment.dev";
import Profile from "./components/profile/Profile";
import DashBoard from "./components/dashboard/DashBoard";
import * as Constants from "./utils/constants";
import AuthRoute from "./utils/AuhtRoute";
import UnAuthorized from "./components/unauthorized/UnAuthorized";
import { AuthContextProvider } from "./context/auth-context";
import "./index.scss";

const AuthApp = () => {
  const oktaConfig = new OktaAuth(config);
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
            roles={[Constants.USER_ROLE, Constants.ADMIN_ROLE]}
          ></AuthRoute>
          <AuthRoute
            path="/dashboard"
            component={DashBoard}
            roles={[Constants.ADMIN_ROLE]}
          ></AuthRoute>
          <Route path="/unauthorized" component={UnAuthorized} />
        </Switch>
      </AuthContextProvider>
    </Security>
  );
};

export default AuthApp;
