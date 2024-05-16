import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Function to handle previous page click
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  // Function to handle next page click
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Calculate start and end page numbers to display
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(startPage + 4, totalPages);

  return (
    <nav className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500">
        Showing
        <span className="font-semibold text-gray-900">{(currentPage - 1) * 10 + 1}</span>-{Math.min(currentPage * 10, totalPages * 10)}
        of
        <span className="font-semibold text-gray-900">{totalPages * 10}</span>
      </span>
      <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <button
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
            className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          >
            <span className="sr-only">Previous</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
        {/* Render pagination buttons based on startPage and endPage */}
        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={startPage + index}>
            <button
              onClick={() => onPageChange(startPage + index)}
              className={`flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
                currentPage === startPage + index ? "font-semibold" : ""
              }`}
            >
              {startPage + index}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ${
              currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          >
            <span className="sr-only">Next</span>
            <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
