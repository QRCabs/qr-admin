import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api.json";
import endpoint from "../../utils/apiUtil";
import { LoginActionTypes } from "./Login.actionTypes";

export function* login(req) {
  try {
    let res = yield call(endpoint.post, api.adminLogin, req?.payload);
    if (res?.data?.status) {
      yield put({
        type: LoginActionTypes.ADMIN_LOGIN_SUCCESS,
        user: res?.data?.data,
      });
    } else {
      yield put({
        type: LoginActionTypes.ADMIN_LOGIN_FAILED,
        user: res?.data?.data,
      });
    }
  } catch (error) {
    yield put({
      type: LoginActionTypes.ADMIN_LOGIN_FAILED,
      user: error,
    });
  }
}

export function* LoginWatcher() {
  yield takeLatest(LoginActionTypes.ADMIN_LOGIN, login);
}
