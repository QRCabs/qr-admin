import { useState } from "react";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
const ApprovalModal = (props) => {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const driverApprove = useSelector((state) => state?.drivers?.driverApprove);

  return (
    <div className="bg-gray-200">
      <div id="modal-container" className="fixed inset-0 z-40 flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="bg-white shadow-lg rounded-md p-8 z-50">
          {!driverApprove?.loading ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold capitalize">{props.type}</h2>
                <button
                  onClick={() => {
                    setComment("");
                    setError(false);
                    props.onClose();
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="flex flex-col">
                <textarea
                  onChange={(e) => {
                    if (error) setError(false);
                    setComment(e.target.value);
                  }}
                  placeholder="Enter Your Comments"
                  cols="30"
                  rows="5"
                  className="p-3 bg-gray-50"
                ></textarea>
                {error && <label className="text-red-500 text-xs">Please Enter Comments</label>}
              </div>
              <div className="mt-6 flex justify-end gap-4">
                <button
                  id="modal-close"
                  className={`${
                    props.type === "approve" ? " bg-green-400 hover:bg-green-600" : "bg-red-400 hover:bg-red-600"
                  } text-white font-bold py-2 px-4 rounded capitalize`}
                  onClick={() => {
                    if (comment.length != 0 && comment) props.onSubmit(comment);
                    else setError(true);
                  }}
                >
                  {props.type}
                </button>
                <button
                  onClick={() => {
                    setComment("");
                    setError(false);
                    props.onClose();
                  }}
                  className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <p className="animate-pulse text-xl font-semibold">{props?.type === "approve" ? "Approving" : "Rejecting"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal;
