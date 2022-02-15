import React, { FC, useEffect, useState, useCallback } from "react";
import { getLogin, removeLogin, setLogin } from "../utils/localstorage.helper";
import { useOktaAuth } from "@okta/okta-react";
import { AuthConstants } from "../utils/constants";

interface AuthStateType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<AuthStateType>({
  isLoggedIn: false,
  isAdmin: false,
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider: FC = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { authState, oktaAuth } = useOktaAuth();

  const checkIsAdmin = useCallback(() => {
    const groups: string[] = authState?.accessToken?.claims.group;
    setIsAdmin(groups?.includes(AuthConstants.roles.ADMIN_ROLE));
  }, [authState?.accessToken?.claims.group]);

  useEffect(() => {
    const storedUserLoggedInInformation = getLogin();
    if (storedUserLoggedInInformation === "1") {
      setisLoggedIn(true);
    }
    if (authState?.isAuthenticated) {
      setLogin();
      setisLoggedIn(true);
    }
    if (!authState?.isAuthenticated) {
      removeLogin();
      setisLoggedIn(false);
    }
    checkIsAdmin();
  }, [checkIsAdmin, authState?.isAuthenticated]);

  const loginHandler = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: AuthConstants.postAuthRedirectURI });
  };

  const logoutHandler = () => {
    oktaAuth.signOut({});
    removeLogin();
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
