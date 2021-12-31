enum LoginType {
  Local = "local",
  Okta = "okta",
}

const setLoginType = (login: LoginType) => {
  localStorage.setItem("LoginType", login);
};

const getLoginType = () => {
  return localStorage.getItem("LoginType");
};

const setLogin = () => {
  localStorage.setItem("isLoggedIn", "1");
};

const getLogin = () => {
  return localStorage.getItem("isLoggedIn");
};

const removeLogin = () => {
  localStorage.removeItem("isLoggedIn");
};

const setUser = (user) => {
  localStorage.setItem("user", user);
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};

const removeUser = () => {
  localStorage.removeItem("user");
};

export {
  getUser,
  setUser,
  removeUser,
  setLoginType,
  getLoginType,
  LoginType,
  setLogin,
  getLogin,
  removeLogin,
};
