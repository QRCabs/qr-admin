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

export function* getDriverInfo(req) {
  try {
    let { payload } = req;

    let res = yield call(endpoint.get, api.getDriverInfo + "?driverId=" + payload.driverId);
    // "65f6e6aedf626d1919aefe87");

    if (res?.data?.status) {
      yield put({
        type: DriverActionTypes.GET_DRIVER_INFO_SUCCESS,
        driverInfo: res?.data,
      });
    } else {
      yield put({
        type: DriverActionTypes.GET_DRIVER_INFO_FAILED,
        driverInfo: res?.data,
      });
    }
  } catch (error) {
    yield put({
      type: DriverActionTypes.GET_DRIVER_INFO_FAILED,
      driverInfo: error,
    });
  }
}

export function* approveDriverData(req) {
  try {
    let { payload } = req;

    let res = yield call(endpoint.put, api.driverUpdate, payload);

    if (res?.data?.status) {
      yield put({
        type: DriverActionTypes.DRIVER_DATA_APPROVE_SUCCESS,
        driverApprove: res?.data,
      });
    } else {
      yield put({
        type: DriverActionTypes.DRIVER_DATA_APPROVE_FAILED,
        driverApprove: res?.data,
      });
    }
  } catch (error) {
    yield put({
      type: DriverActionTypes.DRIVER_DATA_APPROVE_FAILED,
      driverApprove: error,
    });
  }
}

export function* driverActive(req) {
  try {
    let { payload } = req;
    let res = yield call(endpoint.put, api.driverActive + payload.id);

    if (res?.data?.status) {
      yield put({
        type: DriverActionTypes.DRIVER_ACTIVE_SUCCESS,
        driverActive: res?.data,
      });
    } else {
      yield put({
        type: DriverActionTypes.DRIVER_ACTIVE_FAILED,
        driverActive: res?.data,
      });
    }
  } catch (error) {
    yield put({
      type: DriverActionTypes.DRIVER_ACTIVE_FAILED,
      driverActive: error,
    });
  }
}

export function* DriverWatcher() {
  yield takeLatest(DriverActionTypes.GET_ALL_DRIVERS, getDriversList);
  yield takeLatest(DriverActionTypes.GET_DRIVER_INFO, getDriverInfo);
  yield takeLatest(DriverActionTypes.DRIVER_DATA_APPROVE, approveDriverData);
  yield takeLatest(DriverActionTypes.DRIVER_ACTIVE, driverActive);
}
