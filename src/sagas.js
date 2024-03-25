import { all } from "redux-saga/effects";
import { LoginWatcher } from "./components/login/Login.saga";
import { DriverWatcher } from "./components/drivers/Drivers.saga";

export default function* rootSaga() {
  yield all([LoginWatcher(), DriverWatcher()]);
}
