import { OktaAuthOptions } from "@okta/okta-auth-js";
import AuthApp from "./AuthApp";
import Header from "./components/header/Header";
import AuthContext from "./context/auth-context";
import AuthRoute from "./utils/AuhtRoute";
import { AuthConstants } from "./utils/constants";

export const ROLES = AuthConstants.roles;
export interface AuthConfig {
  config?: OktaAuthOptions;
  roles?: {
    USER_GROUP?: string;
    ADMIN_GROUP?: string;
  };
  postAuthRedirectPage?: string;
}

export { AuthApp, Header, AuthRoute, AuthContext };
