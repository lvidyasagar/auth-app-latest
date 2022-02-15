const setLogin = () => {
  localStorage.setItem("isLoggedIn", "1");
};

const getLogin = () => {
  return localStorage.getItem("isLoggedIn");
};

const removeLogin = () => {
  localStorage.removeItem("isLoggedIn");
};

export { setLogin, getLogin, removeLogin };
