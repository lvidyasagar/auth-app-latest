import React, { FC, useEffect, useState, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import {
  getLogin,
  getLoginType,
  getUser,
  LoginType,
  removeLogin,
  removeUser,
  setLogin,
  setUser,
} from "../utils/localstorage.helper";
import { useOktaAuth } from "@okta/okta-react";
import { useHistory } from "react-router-dom";
import * as Constants from "../utils/constants";

interface AuthStateType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  error: boolean;
  clearError: () => void;
  onLogin: (email?, password?) => void;
  onLogout: () => void;
}

const AuthContext = React.createContext<AuthStateType>({
  isLoggedIn: false,
  isAdmin: false,
  error: false,
  clearError: () => {},
  onLogin: () => {},
  onLogout: () => {},
});

export const AuthContextProvider: FC = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(false);
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();

  const checkIsAdmin = useCallback(() => {
    if (getLoginType() === LoginType.Okta) {
      const groups: string[] = authState?.accessToken?.claims.group;
      setIsAdmin(groups?.includes(Constants.ADMIN_ROLE));
    }
    if (getLoginType() === LoginType.Local) {
      setIsAdmin(getUser()?.role === Constants.ADMIN_ROLE);
    }
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
    checkIsAdmin();
  }, [checkIsAdmin, authState?.isAuthenticated]);

  const loginHandler = async (email, password) => {
    if (getLoginType() === LoginType.Local) {
      axios
        .post("http://localhost:3001/login", { email, password })
        .then((res: AxiosResponse) => {
          if (res.data && res.data.token) {
            setLogin();
            setisLoggedIn(true);
            setUser(JSON.stringify(res.data));
            checkIsAdmin();
            history.push({ pathname: "/" });
          }
        })
        .catch(() => {
          setisLoggedIn(false);
          setError(true);
        });
    } else {
      await oktaAuth.signInWithRedirect({ originalUri: "/" });
    }
  };

  const logoutHandler = () => {
    if (getLoginType() === LoginType.Local) {
      removeUser();
      setisLoggedIn(false);
      history.push("/");
    } else {
      oktaAuth.signOut({});
    }
    removeLogin();
  };

  const clearErrorHandler = () => {
    error && setError(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        isAdmin: isAdmin,
        error: error,
        clearError: clearErrorHandler,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
