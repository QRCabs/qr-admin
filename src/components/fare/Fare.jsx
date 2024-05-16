/* eslint-disable react/prop-types */

import { Formik, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import endpoint from "../../utils/apiUtil";
import api from "../../api.json";

function Fare({ data, vehicleTypes, addFareSubmit, fareLoading, cancelAdd, updateFare, isUpdateSuccess }) {
  const [isEdit, setIsEdit] = useState(data?._id === "add");
  const [models, setModels] = useState([]);

  const getModels = (type) => {
    endpoint
      .get(api.getVehicleModels + type)
      .then((res) => setModels(res.data.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsEdit(false);
    }
  }, [isUpdateSuccess]);

  return (
    <Formik
      initialValues={data}
      validationSchema={fareSchema}
      onSubmit={(vals) => {
        if (data?._id === "add") {
          addFareSubmit(vals);
        } else {
          updateFare(vals);
        }
      }}
    >
      {({ values, errors, handleChange, handleBlur, resetForm, setFieldValue, handleSubmit }) => (
        <div className="bg-white rounded-lg p-5 text-lg my-4">
          <div className="flex justify-between pb-4 border-b-2">
            <p className="font-semibold">
              Vehicle Type:
              {data?._id === "add" ? (
                <select
                  value={values?.vehicle_type}
                  className="font-light ml-3"
                  onChange={(e) => {
                    setFieldValue("vehicle_type", e.target.value);
                    getModels(e.target.value);
                  }}
                >
                  <option value="">Select Vehicle Type</option>
                  {vehicleTypes.map((ele) => (
                    <option key={ele?.type}>{ele?.type}</option>
                  ))}
                </select>
              ) : (
                <span className="font-normal capitalize">{values?.vehicle_type}</span>
              )}
            </p>
            <p className="font-semibold">
              Vehicle Name:
              {data?._id === "add" ? (
                <select
                  value={values?.name}
                  className="font-light ml-3"
                  onChange={(e) => {
                    setFieldValue("name", e.target.value);
                  }}
                >
                  <option value="">Select Name</option>
                  {models?.map((ele) => (
                    <option key={ele?.make}>
                      {ele?.make} - {ele?.model}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="font-normal capitalize">{values?.name}</span>
              )}
            </p>
          </div>
          <div className="flex justify-between py-4 border-b-2">
            <div>
              <label htmlFor="first_name" className="block mb-2 text-sm font-semibold text-gray-900">
                Base Fare (/km)
              </label>
              <input
                type="text"
                name="base_fare_km"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                disabled={!isEdit}
                value={values?.base_fare_km}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-xs text-red-500 mt-1">
                <ErrorMessage name="base_fare_km" />
              </div>
            </div>
            <div>
              <label htmlFor="price_per_km" className="block mb-2 text-sm font-semibold text-gray-900">
                Fare (/km)
              </label>
              <input
                type="text"
                name="price_per_km"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                disabled={!isEdit}
                value={values?.price_per_km}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-xs text-red-500 mt-1">
                <ErrorMessage name="price_per_km" />
              </div>
            </div>
            <div>
              <label htmlFor="waiting_charges" className="block mb-2 text-sm font-semibold text-gray-900">
                Waiting Charges
              </label>
              <input
                type="text"
                name="waiting_charges"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                disabled={!isEdit}
                value={values?.waiting_charges}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-xs text-red-500 mt-1">
                <ErrorMessage name="waiting_charges" />
              </div>
            </div>
            <div>
              <label htmlFor="platform_charges" className="block mb-2 text-sm font-semibold text-gray-900">
                Platform Charges
              </label>
              <input
                type="text"
                name="platform_charges"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                disabled={!isEdit}
                value={values?.platform_charges}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="text-xs text-red-500 mt-1">
                <ErrorMessage name="platform_charges" />
              </div>
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-8">
            {isEdit ? (
              <>
                <button
                  className={`bg-blue-500 text-white px-4 py-2 rounded-lg ${fareLoading === values?._id ? "animate-pulse" : ""}`}
                  disabled={fareLoading === values?._id}
                  onClick={handleSubmit}
                >
                  {data?._id === "add" ? "Add" : "Update"}
                </button>
                <button
                  disabled={fareLoading === values?._id}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    if (data?._id !== "add") {
                      resetForm(data);
                      setIsEdit(false);
                    } else {
                      cancelAdd();
                    }
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => setIsEdit(true)}>
                Edit
              </button>
            )}
          </div>
        </div>
      )}
    </Formik>
  );
}

export default Fare;

let fareSchema = Yup.object().shape({
  name: Yup.string().required("Vehicle Model is required"),
  vehicle_type: Yup.string().required("Vehicle Type is required"),
  base_fare_km: Yup.string().required("Base Fare is required"),
  price_per_km: Yup.string().required("Price per KM is required"),
  waiting_charges: Yup.string().required("Waiting Charges is required"),
  platform_charges: Yup.string().required("Waiting Charges is required"),
});
