import DriverActionTypes from "./Drivers.actionTypes";

export const DriversReducer = (state = {}, action) => {
  switch (action.type) {
    case DriverActionTypes.GET_ALL_DRIVERS:
      return {
        loading: true,
      };

    case DriverActionTypes.GET_ALL_DRIVERS_SUCCESS:
      return {
        loading: false,
        success: true,
        ...action.drivers,
      };

    case DriverActionTypes.GET_ALL_DRIVERS_FAILED:
      return {
        loading: false,
        success: false,
        ...action.drivers,
      };

    case DriverActionTypes.GET_ALL_DRIVERS_RESET:
      return {};

    default:
      return state;
  }
};
