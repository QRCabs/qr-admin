import DriverActionTypes from "./Drivers.actionTypes";

export const DriversListReducer = (state = {}, action) => {
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

export const DriverInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case DriverActionTypes.GET_DRIVER_INFO:
      return {
        loading: true,
      };

    case DriverActionTypes.GET_DRIVER_INFO_SUCCESS:
      return {
        loading: false,
        ...action.driverInfo,
      };

    case DriverActionTypes.GET_DRIVER_INFO_FAILED:
      return {
        loading: false,
        ...action.driverInfo,
      };

    case DriverActionTypes.GET_DRIVER_INFO_RESET:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const DriverDataApproveReducer = (state = {}, action) => {
  switch (action.type) {
    case DriverActionTypes.DRIVER_DATA_APPROVE:
      return {
        loading: true,
      };

    case DriverActionTypes.DRIVER_DATA_APPROVE_SUCCESS:
      return {
        loading: false,
        ...action.driverApprove,
      };

    case DriverActionTypes.DRIVER_DATA_APPROVE_FAILED:
      return {
        loading: false,
        ...action.driverApprove,
      };

    case DriverActionTypes.DRIVER_DATA_APPROVE_RESET:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const DriverActiveReducer = (state = {}, action) => {
  switch (action.type) {
    case DriverActionTypes.DRIVER_ACTIVE:
      return {
        loading: true,
      };

    case DriverActionTypes.DRIVER_ACTIVE_SUCCESS:
      return {
        loading: false,
        ...action.driverActive,
      };

    case DriverActionTypes.DRIVER_ACTIVE_FAILED:
      return {
        loading: false,
        ...action.driverActive,
      };

    case DriverActionTypes.DRIVER_ACTIVE_RESET:
      return {
        loading: false,
      };

    default:
      return state;
  }
};

export const DriversReducer = () => {
  return {
    allDrivers: DriversListReducer,
    driverInfo: DriverInfoReducer,
    driverApprove: DriverDataApproveReducer,
    driverActive: DriverActiveReducer,
  };
};
