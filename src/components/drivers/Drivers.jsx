/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DriverActionTypes from "./Drivers.actionTypes";
import DriversDataTable from "./DriversDataTable";

function Drivers() {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const [state, setState] = useState({
    page: 1,
    limit: 10,
    driversData: [],
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

  useEffect(() => {
    if (drivers?.allDrivers?.success) {
      setState({
        ...state,
        driversData: drivers.allDrivers.data,
      });
    }
    console.log(drivers.allDrivers.data);
  }, [drivers]);

  return (
    <div className="bg-gray-200 h-full py-8 px-4 mx-auto lg:px-12">
      <p className="text-3xl font-semibold pb-3">Drivers</p>
      <span className="">List of All Drivers</span>
      <DriversDataTable data={state.driversData} />
    </div>
  );
}

export default Drivers;
