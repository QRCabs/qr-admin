import { combineReducers } from "redux";
import { LoginReducer } from "./components/login/Login.reducer";
import { DriversReducer } from "./components/drivers/Drivers.reducer";
import { LoginActionTypes } from "./components/login/Login.actionTypes";

const reducers = combineReducers({
  user: LoginReducer,
  drivers: combineReducers({
    ...DriversReducer(),
  }),
});

export const rootReducer = (state, action) => {
  if (action.type === LoginActionTypes.ADMIN_LOGOUT) {
    state = {};
  }
  return reducers(state, action);
};
