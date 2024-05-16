import { Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

/* eslint-disable react/prop-types */
function FaresDataTable({ data }) {
  const [theData, setTheData] = useState(data);
  const [editRow, setEditRow] = useState("");

  const addFare = () => {
    let arr = [...theData];
    arr.push({
      _id: "add",
      name: "",
      country_id: "",
      vehicle_type: "",
      price_per_km: 0,
      base_fare_km: 0,
      waiting_charges: 0,
      platform_charges: 0,
    });
    setTheData(arr);
    setEditRow("add");
  };

  return (
    <div>
      <section className="py-3 sm:py-5">
        <div className="max-w-screen-2xl">
          <div className="relative overflow-hidden bg-white shadow-md  sm:rounded-lg">
            <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
              <div className="flex items-center flex-1 space-x-4">
                <h5>
                  <span className="text-gray-500">All Drivers: </span>
                  <span className="">{theData?.length}</span>
                </h5>
              </div>
              <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                <button
                  type="button"
                  onClick={() => addFare()}
                  className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200"
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
                  + Add Fare
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
                      Vehicle Name
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Vehicle Type
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Base Fare
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Price Per KM
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Waiting Charges
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Platform Charges
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {theData &&
                    theData?.map((dt, i) => (
                      <>
                        <Formik
                          initialValues={dt}
                          validationSchema={fareSchema}
                          onSubmit={() => {
                            console.log("Submitted");
                          }}
                        >
                          {({ values, errors, resetForm }) => (
                            <tr className="border-b  hover:bg-gray-100" key={i}>
                              <td className="w-4 px-4 py-3">{i + 1}</td>
                              <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap capitalize">
                                {editRow.includes(values?._id) ? <input className="" value={values?.name} /> : values?.name}
                              </th>
                              <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded capitalize">
                                  {values.vehicle_type}
                                </span>
                              </td>
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                                <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded capitalize">
                                  {values.base_fare}
                                </span>
                              </td>
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{values?.price_per_km}</td>
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{values?.waiting_charges}</td>
                              <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{values?.platform_charges}</td>
                              <td className="px-4 py-2 font-medium text-blue-700 whitespace-nowrap cursor-pointer">
                                {editRow.includes(values?._id) ? (
                                  <>
                                    <span className="mr-4">Add/Update</span>
                                    <span
                                      onClick={() => {
                                        resetForm(dt);
                                        setEditRow("");
                                      }}
                                    >
                                      Cancel
                                    </span>
                                  </>
                                ) : (
                                  <span onClick={() => setEditRow(values?._id)}>Edit</span>
                                )}
                              </td>
                            </tr>
                          )}
                        </Formik>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
            <nav
              className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
              aria-label="Table navigation"
            >
              <span className="text-sm font-normal text-gray-500">
                Showing
                <span className="font-semibold text-gray-900">1-10</span>
                of
                <span className="font-semibold text-gray-900">1000</span>
              </span>
              <ul className="inline-flex items-stretch -space-x-px">
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Previous</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  >
                    <span className="sr-only">Next</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FaresDataTable;
