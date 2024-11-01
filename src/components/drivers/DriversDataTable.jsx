import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "../common/Pagination";
import { useDispatch } from "react-redux";
import DriverActionTypes from "./Drivers.actionTypes";
import { Formik, ErrorMessage } from "formik";
import DatePicker from "react-multi-date-picker"

import { useState } from "react";
/* eslint-disable react/prop-types */
function DriversDataTable({ data, page, onPageChange, pageSize, totalRecords }) {
  const dispatch = useDispatch();

  const initialValuesObj = {
    page: page,
    limit: pageSize,
    name: "",
    mobile: "",
    blocked: '',
    joinedFrom: "",
    joinedTo: ""
  }

  const handleRefresh = () => {
    dispatch({
      type: DriverActionTypes.GET_ALL_DRIVERS,
      payload: initialValuesObj,
    });
  }
  const [dateRange, setDateRange] = useState([null, null]);

  // Function to update the date range in a single date picker
  const handleDateChange = (range) => {
    setDateRange(range);
  };

  const getISODateRange = () => {
    if (dateRange[0] && dateRange[1]) {
      return [
        dateRange[0].toDate().toISOString(),
        dateRange[1].toDate().toISOString(),
      ];
    }
    return [null, null];
  };

  const isoDateRange = getISODateRange();
  console.log(dateRange[0]?.format("MM/DD/YYYY"), "FromdateRange", dateRange[1]?.format("MM/DD/YYYY"), "toDate")

  return (
    <div>
      <section className="py-3 sm:py-5">
        <div className="max-w-screen-2xl">
          <div className="relative overflow-hidden bg-white shadow-md  sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Drivers: </span>
                  <span className="">{data.length}</span>
                </h5>
              </div>
              <>
              <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-900">
                              Dates
                            </label>
                <div style={{
          display: "flex",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          padding: "8px 12px",
          width: "260px",
          cursor: "pointer",
          backgroundColor: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}>
          
                  <DatePicker
                    value={dateRange}
                    onChange={handleDateChange}
                    range
                    format="MM/DD/YYYY"
                    placeholder="Select Date Range"
                    portal // Renders the calendar in a portal to avoid positioning issues
                    style={{
                      border: "none",
                      outline: "none",
                      width: "100%",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#333",
                    }}
                    containerStyle={{
                      width: "100%",
                    }}
                  />
                </div>
                <Formik
                  initialValues={initialValuesObj}
                  onSubmit={(vals) => {
                    vals.page = page,
                    vals.limit= pageSize,
                    vals.name =vals.name,
                    vals.mobile = vals.mobile,
                    vals.blocked = vals.blocked,
                    vals.joinedFrom = isoDateRange[0]
                    vals.joinedTo = isoDateRange[1]
                    dispatch({
                      type: DriverActionTypes.GET_ALL_DRIVERS,
                      payload: vals,
                    });
                  }}
                >
                  {({ values, errors, handleChange, handleBlur, resetForm, setFieldValue, handleSubmit }) => (
                    <>
                      <div className="bg-white rounded-lg p-5 text-lg my-4">
                        <div className="flex justify-between py-4 border-b-2">
                          <div>
                            <label htmlFor="name" className="block mb-2 text-sm font-semibold text-gray-900">
                              Name
                            </label>
                            <input
                              type="text"
                              name="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              // disabled={!isEdit}
                              value={values?.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-xs text-red-500 mt-1">
                              <ErrorMessage name="name" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="mobile" className="block mb-2 text-sm font-semibold text-gray-900">
                              Mobile No:
                            </label>
                            <input
                              type="text"
                              name="mobile"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              // disabled={!isEdit}
                              value={values?.mobile}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-xs text-red-500 mt-1">
                              <ErrorMessage name="mobile" />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="blocked" className="block mb-2 text-sm font-semibold text-gray-900">
                              Blocked User
                            </label>
                            <input
                              type="text"
                              name="blocked"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                              // disabled={!isEdit}
                              value={values?.blocked}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="text-xs text-red-500 mt-1">
                              <ErrorMessage name="blocked" />
                            </div>
                          </div>
                        </div>
                        <div className="pt-4 flex justify-end gap-8">
                          <>
                            <button
                              className={`bg-blue-500 text-white px-4 py-2 rounded-lg `}
                              onClick={handleSubmit}
                            >
                              Search
                            </button>
                          </>
                        </div>
                      </div>
                    </>
                  )}
                </Formik></>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">

                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={() => { handleRefresh() }}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                  Refresh
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 "
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  Export
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                  <tr>
                    <th scope="col" className="p-4">
                      S.No
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Mobile
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Rating
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Last Update
                    </th>
                    <th scope="col" className="px-4 py-3">
                      View Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((dt, i) => (
                      <tr className="border-b  hover:bg-gray-100" key={i}>
                        <td className="w-4 px-4 py-3">{i + 1}</td>
                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                          <img
                            src={dt.profile_image || "https://picsum.photos/seed/picsum/200/300"}
                            alt="Profile Image"
                            className="w-8 h-8 mr-3 rounded-2xl"
                          />
                          {dt.fullname}
                        </th>
                        <td className="px-4 py-2">
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">{dt.mobile}</span>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className={`inline-block w-4 h-4 mr-2 rounded-full ${dt?.isProfileVerified ? "bg-green-700" : "bg-red-700"}`}></div>
                            {dt?.isProfileVerified ? "Verified" : "Not Verified"}
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                          <div className="flex items-center">
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <svg
                              aria-hidden="true"
                              className="w-5 h-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-gray-500 dark:text-gray-400">{dt?.totalRatings + "     / 5" || "NA"}</span>
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{moment(dt.updatedAt).format("DD/MM hh:mm")}</td>
                        <td className="px-4 py-2 font-medium text-blue-700 whitespace-nowrap cursor-pointer">
                          <Link to={"/viewDriver/" + dt._id}>View Details</Link>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={page} totalPages={Math.ceil(totalRecords / pageSize)} onPageChange={onPageChange} />
          </div>
        </div>
      </section>
    </div>
  );
}

export default DriversDataTable;
