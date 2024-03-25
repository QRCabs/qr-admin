import { combineReducers } from "redux";
import { LoginReducer } from "./components/login/Login.reducer";
import { DriversReducer } from "./components/drivers/Drivers.reducer";
import { LoginActionTypes } from "./components/login/Login.actionTypes";

const reducers = combineReducers({
  user: LoginReducer,
  drivers: DriversReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === LoginActionTypes.ADMIN_LOGOUT) {
    state = undefined;
  }
  return reducers(state, action);
};
