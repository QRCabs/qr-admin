import Pagination from "../common/Pagination";

/* eslint-disable react/prop-types */
function LocationsDataTable({ data, page, onPageChange, pageSize, totalRecords, onEdit }) {
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
              {false && (
                <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
                  <button
                    type="button"
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
              )}
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
                      Latitude
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Longitude
                    </th>
                    <th scope="col" className="px-4 py-3">
                      State & City
                    </th>
                    <th scope="col" className="px-4 py-3">
                      ZipCode
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Suggestion Type
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Edit
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Delete
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((dt, i) => (
                      <tr className="border-b  hover:bg-gray-100" key={i}>
                        <td className="w-4 px-4 py-3">{i + 1}</td>
                        <th scope="row" className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap">
                          {dt.address}
                        </th>

                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{dt.latitude}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{dt?.longitude}</td>
                        <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap">{dt?.state + " - " + dt?.city}</td>
                        <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap cursor-pointer">{dt?.zipcode}</td>
                        <td className="px-4 py-2 font-medium text-gray-700 whitespace-nowrap cursor-pointer">{dt?.suggestion_type}</td>
                        <td className="px-4 py-2 font-medium text-blue-700 whitespace-nowrap cursor-pointer" onClick={() => onEdit(dt)}>
                          Edit
                        </td>
                        <td className="px-4 py-2 font-medium text-red-700 whitespace-nowrap cursor-pointer">Delete</td>
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

export default LocationsDataTable;
