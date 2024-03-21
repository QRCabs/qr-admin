import store from "../store.jsx";

export const getUserFromStore = () => {
  const userData = store.getState()?.user;
  return userData;
};

export const grantModuleAccess = (module) => {
  const userModules = store.getState()?.user?.modules;
  return userModules.includes(module) > -1;
};
