import { LoginActionTypes } from "./Login.actionTypes";

export const LoginReducer = (state = { token: false }, action) => {
  switch (action.type) {
    case LoginActionTypes.ADMIN_LOGIN:
      return {
        loading: true,
      };

    case LoginActionTypes.ADMIN_LOGIN_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.user,
      };

    case LoginActionTypes.ADMIN_LOGIN_FAILED:
      return {
        loading: false,
        success: false,
        ...action.user,
      };

    default:
      return state;
  }
};
