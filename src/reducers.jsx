import { combineReducers } from "redux";
import { Login_Reducer } from "./components/login/Login.reducer";

const reducers = combineReducers({
  user: Login_Reducer,
});

export const rootReducer = (state, action) => reducers(state, action);
