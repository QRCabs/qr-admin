/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DriverActionTypes from "./Drivers.actionTypes";

function Drivers() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    dispatch({
      type: DriverActionTypes.GET_ALL_DRIVERS,
      payload: {
        page: state.page,
        limit: state.limit,
      },
    });
  }, []);

  return <div>Drivers</div>;
}

export default Drivers;
