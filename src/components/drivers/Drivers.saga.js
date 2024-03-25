import { call, put, takeLatest } from "redux-saga/effects";
import api from "../../api.json";
import endpoint from "../../utils/apiUtil";
import DriverActionTypes from "./Drivers.actionTypes";

export function* getDriversList(req) {
  try {
    let { payload } = req;
    let page = payload.page;
    let limit = payload.limit;
    delete payload.page;
    delete payload.limit;

    let res = yield call(endpoint.get, api.getDriversList + "?page=" + page + "&limit=" + limit, payload);

    if (res?.data?.status) {
      yield put({
        type: DriverActionTypes.GET_ALL_DRIVERS_SUCCESS,
        drivers: res?.data,
      });
    } else {
      yield put({
        type: DriverActionTypes.GET_ALL_DRIVERS_FAILED,
        drivers: res?.data,
      });
    }
  } catch (error) {
    yield put({
      type: DriverActionTypes.GET_ALL_DRIVERS_FAILED,
      drivers: error,
    });
  }
}

export function* DriverWatcher() {
  yield takeLatest(DriverActionTypes.GET_ALL_DRIVERS, getDriversList);
}
