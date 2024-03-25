import { combineReducers } from "redux";
import { LoginReducer } from "./components/login/Login.reducer";
import { DriversReducer } from "./components/drivers/Drivers.reducer";

const reducers = combineReducers({
  user: LoginReducer,
  drivers: DriversReducer,
});

export const rootReducer = (state, action) => reducers(state, action);
