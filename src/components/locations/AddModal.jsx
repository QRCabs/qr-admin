/* eslint-disable react/prop-types */
import { Formik, Field, ErrorMessage } from "formik";
import endpoint from "../../utils/apiUtil";
import api from "../../api.json";
import PopupModal from "../common/PopupModal";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";

function AddModal({ open, onClose, editData, isEdit }) {
  const formRef = useRef();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [load, setLoad] = useState(false);
  const [selectedState, setSeleectedState] = useState("");

  useEffect(() => {
    endpoint
      .get(api.getAllStates + "661beb043c7ff888679f1f1c")
      .then((res) => setStates(res.data.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (selectedState) {
      endpoint
        .get(api.getAllCities + selectedState)
        .then((res) => setCities(res.data.data))
        .catch((err) => console.log(err));
    }
  }, [selectedState]);

  const addLoc = (vals) => {
    setLoad(true);
    let obj = { ...vals };
    obj.longitude = Number(vals?.longitude);
    obj.latitude = Number(vals?.latitude);
    obj.zipcode = Number(vals?.zipcode);
    endpoint
      .post(api.addSuggestLocs, obj)
      .then(() => onClose(true))
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };

  const editLoc = (vals) => {
    setLoad(true);
    let obj = { ...vals };
    obj.longitude = Number(vals?.longitude);
    obj.latitude = Number(vals?.latitude);
    obj.zipcode = Number(vals?.zipcode);
    endpoint
      .post(api.updateSuggestLocs + "/" + vals?._id, obj)
      .then(() => onClose(true))
      .catch((err) => console.error(err))
      .finally(() => setLoad(false));
  };

  return (
    <PopupModal open={open}>
      <div className="relative p-4 bg-white rounded-lg shadow sm:p-5">
        <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 ">
          <h3 className="text-lg font-semibold text-gray-900">{isEdit ? "Edit" : "Add"} Location</h3>
          <button
            type="button"
            onClick={() => onClose(false)}
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            data-modal-toggle="defaultModal"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <Formik
          innerRef={formRef}
          initialValues={
            isEdit
              ? editData
              : {
                  address: "",
                  longitude: null,
                  latitude: null,
                  state: "",
                  city: "",
                  zipcode: null,
                  suggestion_type: "",
                }
          }
          validationSchema={locSchema}
          onSubmit={(vals) => (isEdit ? editLoc(vals) : addLoc(vals))}
        >
          {({ setFieldValue, handleSubmit }) => (
            <form action="#">
              <div className="grid gap-4 mb-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
                    Address Name
                  </label>
                  <Field
                    type="text"
                    name="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Address Name"
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="address" />
                  </div>
                </div>
                <div>
                  <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">
                    Longitude
                  </label>
                  <Field
                    type="text"
                    name="longitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Longitude"
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="longitude" />
                  </div>
                </div>
                <div>
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
                    Latitude
                  </label>
                  <Field
                    type="text"
                    name="latitude"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Latitude"
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="latitude" />
                  </div>
                </div>
                <div>
                  <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">
                    State
                  </label>
                  {isEdit ? (
                    <Field
                      disabled={true}
                      type="text"
                      name="state"
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="state"
                    />
                  ) : (
                    <select
                      id="state"
                      onChange={(e) => {
                        setFieldValue("state", e.target.value);
                        setSeleectedState(states?.find((ele) => ele?.state === e.target.value)?._id);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected="">Select State</option>
                      {states?.map((ele) => (
                        <option key={ele?._id} value={ele?.state}>
                          {ele.state}
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="state" />
                  </div>
                </div>
                <div className="">
                  <label htmlFor="City" className="block mb-2 text-sm font-medium text-gray-900">
                    City
                  </label>
                  {isEdit ? (
                    <Field
                      disabled={true}
                      type="text"
                      name="city"
                      className="bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="state"
                    />
                  ) : (
                    <select
                      id="city"
                      onChange={(e) => {
                        setFieldValue("city", e.target.value);
                      }}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5"
                    >
                      <option selected="">Select City</option>
                      {cities?.map((ele) => (
                        <option key={ele?._id} value={ele?.city}>
                          {ele.city}
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="city" />
                  </div>
                </div>
                <div>
                  <label htmlFor="suggestion_type" className="block mb-2 text-sm font-medium text-gray-900">
                    ZipCode
                  </label>
                  <Field
                    type="text"
                    name="zipcode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="ZipCode"
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="zipcode" />
                  </div>
                </div>
                <div>
                  <label htmlFor="suggestion_type" className="block mb-2 text-sm font-medium text-gray-900">
                    Location Type
                  </label>
                  <Field
                    type="text"
                    name="suggestion_type"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Location Type"
                  />
                  <div className="text-sm text-red-500">
                    <ErrorMessage name="suggestion_type" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                disabled={load}
                onClick={handleSubmit}
                className={
                  "text-white inline-flex items-center bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" +
                  (load ? "animate-pulse" : "")
                }
              >
                {!isEdit && (
                  <svg className="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
                {isEdit ? "Edit" : "Add New"} Location
              </button>
            </form>
          )}
        </Formik>
      </div>
    </PopupModal>
  );
}

export default AddModal;

let locSchema = Yup.object().shape({
  address: Yup.string().required("Address is required"),
  latitude: Yup.string().required("Latitude is required"),
  longitude: Yup.string().required("Longitude is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  zipcode: Yup.string().required("ZipCode is required"),
  suggestion_type: Yup.string().required("Type is required"),
});
