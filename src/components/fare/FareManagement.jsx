import React, { useEffect, useState } from "react";
import endpoint from "../../utils/apiUtil";
import api from "../../api.json";
import FaresDataTable from "./FaresDataTable";
import Fare from "./Fare";

function FareManagement() {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [faresList, setFaresList] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [fareLoading, setFareLoading] = useState("");
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);

  const getFaresList = () => {
    endpoint
      .get(api.dailyFares)
      .then((res) => setFaresList(res?.data?.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    endpoint
      .get(api.getAllCountries)
      .then((res) => {
        setCountries(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getFaresList();
    endpoint
      .get(api.getVehicleTypes)
      .then((res) => setVehicleTypes(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   if (selectedCountry) {
  //     endpoint
  //       .get(api.getAllStates + selectedCountry)
  //       .then((res) => setStates(res.data?.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [selectedCountry]);

  // useEffect(() => {
  //   if (selectedState) {
  //     endpoint
  //       .get(api.getAllCities + selectedState)
  //       .then((res) => setCities(res.data?.data))
  //       .catch((err) => console.log(err));
  //   }
  // }, [selectedState]);

  const addFare = () => {
    let arr = [...faresList];
    if (!selectedCountry) return;
    if (arr.findIndex((ele) => ele._id === "add") > -1) return;
    arr.push({
      _id: "add",
      name: "",
      country_id: selectedCountry,
      vehicle_type: "",
      price_per_km: "",
      base_fare_km: "",
      waiting_charges: "",
      platform_charges: "",
    });
    setFaresList(arr);
    window.scrollTo(0, document.body.scrollHeight + 300);
  };

  const cancelAdd = () => {
    let arr = [...faresList];
    arr.splice(
      arr.findIndex((ele) => ele?._id === "add"),
      1
    );
    setFaresList(arr);
  };

  const addFareSubmit = (vals) => {
    delete vals?._id;
    setFareLoading("add");
    endpoint
      .post(api.addDailyFares, vals)
      .then((res) => {
        getFaresList();
      })
      .catch((err) => console.log(err))
      .finally(() => setFareLoading(""));
  };

  const updateFare = (vals) => {
    let obj = { ...vals };
    delete obj?._id;
    delete obj?.state_ids;
    delete obj?.createdAt;
    delete obj?.is_motorcycle;
    delete obj?.status;
    delete obj?.updatedAt;
    delete obj?.__v;
    delete obj?.date;

    endpoint
      .put(api.updateDailyFareVehcle + vals?._id, obj)
      .then((res) => {
        if (res.data?.status) {
          setIsUpdateSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-4 py-8 bg-gray-200 h-full lg:px-12 w-full">
      <div className="flex justify-between pb-8 items-center">
        <div>
          <i className="fa-solid fa-arrow-left text-2xl mr-4 cursor-pointer"></i>
          <span className="text-3xl font-semibold pb-3">Fare Management</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={addFare}>
          + Add Fare
        </button>
      </div>
      <div className="flex gap-5 w-full">
        <div className="w-1/3">
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
            Country
          </label>
          <select
            id="Country"
            value={selectedCountry}
            onChange={(opt) => {
              setSelectedCountry(opt.target.value);
              setSelectedCity("");
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option>Select Country</option>
            {countries?.map((ele) => (
              <option value={ele?._id} key={ele?._id}>
                {ele?.country}
              </option>
            ))}
          </select>
        </div>
        {/* <div className="w-1/3">
          <label htmlFor="cities" className="block mb-2 text-sm font-medium text-gray-900">
            State
          </label>
          <select
            id="states"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option>Select State</option>
            {states?.map((ele) => (
              <option value={ele?._id} key={ele?._id}>
                {ele?.short_name + " - " + ele?.state}
              </option>
            ))}
          </select>
        </div>
        <div className="w-1/3">
          <label htmlFor="cities" className="block mb-2 text-sm font-medium text-gray-900">
            City
          </label>
          <select
            id="cities"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
          >
            <option>Select City</option>
            {cities?.map((ele) => (
              <option value={ele?._id} key={ele?._id}>
                {ele?.city}
              </option>
            ))}
          </select>
        </div> */}
      </div>
      <div className="pt-8">
        {selectedCountry &&
          (faresList?.filter((ele) => ele?.country_id === selectedCountry)?.length ? (
            selectedCountry &&
            faresList
              ?.filter((ele) => ele?.country_id === selectedCountry)
              .map((dt) => (
                <Fare
                  data={dt}
                  key={dt._id}
                  vehicleTypes={vehicleTypes}
                  addFareSubmit={addFareSubmit}
                  fareLoading={fareLoading}
                  cancelAdd={cancelAdd}
                  updateFare={updateFare}
                  isUpdateSuccess={isUpdateSuccess}
                />
              ))
          ) : (
            <p className="text-center font-semibold">No Fares Found</p>
          ))}
      </div>
    </div>
  );
}

export default FareManagement;
