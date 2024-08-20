import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DriverActionTypes from "./Drivers.actionTypes";
import moment from "moment";
import ApprovalModal from "../common/ApprovalModal";

function DriverInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const driverId = params.id;
  // "65f6e6aedf626d1919aefe87" || ;
  const driverInfo = useSelector((state) => state?.drivers?.driverInfo);
  const driverApprove = useSelector((state) => state?.drivers?.driverApprove);
  const driverActiveR = useSelector((state) => state?.drivers?.driverActive);

  const [data, setData] = useState({});
  const [approveType, setApproveType] = useState("");
  const [approvalPopup, setApprovalPopup] = useState(false);
  const [approvalDoc, setApprovalDoc] = useState({});
  const [driverActive, setDriverActive] = useState(true);

  const getStatusColor = (val) => {
    switch (val) {
      case "pending":
        return "text-yellow-400";
      case "approve":
        return "text-green-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-black";
    }
  };

  const getDriverInfo = () => {
    dispatch({
      type: DriverActionTypes.GET_DRIVER_INFO,
      payload: {
        driverId,
      },
    });
  };

  useEffect(() => {
    getDriverInfo();
    return () => {
      dispatch({
        type: DriverActionTypes.GET_DRIVER_INFO_RESET,
      });
    };
  }, [params.id]);

  useEffect(() => {
    if (driverApprove.status) {
      setApprovalPopup(false);
      setApprovalDoc("");
      setApproveType("");
      setData({});
      getDriverInfo();
    }
  }, [driverApprove.loading]);

  useEffect(() => {
    if (driverInfo?.status) {
      setData(driverInfo.data);
      setDriverActive(driverInfo?.data?.result?.status === "inactive" ? false : true);
    }
  }, [driverInfo]);

  useEffect(() => {
    if (!driverActiveR?.status) {
      setDriverActive(!driverActive);
    }
  }, [driverActiveR]);

  const approveDoc = (payload) => {
    dispatch({
      type: DriverActionTypes.DRIVER_DATA_APPROVE,
      payload,
    });
  };

  const approvalProcess = (type, doc) => {
    setApproveType(type);
    setApprovalDoc(doc);
    if (type !== "approve") setApprovalPopup(true);
    else
      approveDoc({
        ...doc,
        status: type,
      });
  };

  const updateDriverStatus = (id) => {
    dispatch({
      type: DriverActionTypes.DRIVER_ACTIVE,
      payload: {
        id,
      },
    });
  };

  const isDriverDocApproved = () => {
    console.log;
    return (
      data?.profile?.pan_card?.verification_status !== "pending" &&
      data?.profile?.aadhar_card?.verification_status !== "pending" &&
      data?.profile?.driver_card?.verification_status !== "pending"
    );
  };

  const badgeColor = ["bg-blue-100 text-blue-800", "bg-green-100 text-green-800", "bg-yellow-100 text-yellow-800", "bg-slate-100 text-slate-800s"];

  return (
    <>
      {Object.keys(data).length === 0 ? (
        <>
          <div className="px-4 py-8 bg-gray-200 h-full lg:px-12">
            <p className="text-3xl font-semibold pb-3">
              <span onClick={() => navigate(-1)}>
                <i className="fa-solid fa-arrow-left text-2xl mr-4 cursor-pointer"></i>
              </span>
              Driver Info
            </p>
            <span className="">Details of The Driver</span>
            <div className="h-36 w-full bg-white rounded-lg my-8 animate-pulse"></div>
          </div>
        </>
      ) : (
        <div className="px-4 py-8 bg-gray-200 h-full lg:px-12">
          <p className="text-3xl font-semibold pb-3">
            <span onClick={() => navigate(-1)}>
              <i className="fa-solid fa-arrow-left text-2xl mr-4 cursor-pointer"></i>
            </span>
            Driver Info
          </p>
          <span className="">Details of The Driver</span>
          <div className="bg-white w-full my-8 p-4 rounded-lg">
            <section>
              <p className="text-lg font-semibold">Driver Profile</p>
              <div className="mt-4 flex">
                <img src={data?.profile?.img || "https://picsum.photos/seed/picsum/200/200"} alt="User Img" className="rounded-lg" />
                <div className="ml-8">
                  <label className="font-bold">Driver Name</label>
                  <p className="mt-2 mb-6">{data?.fullname}</p>
                  <label className="font-bold">Mobile Number</label>
                  <p className="mt-2 mb-6">
                    {data?.mobile}
                    {data.isMobileVerified ? (
                      <i className="fa-regular fa-circle-check ml-2 text-green-500"></i>
                    ) : (
                      <i className="fa-regular fa-circle-xmark ml-2 text-red-500"></i>
                    )}
                  </p>
                  <label className="font-bold">Email</label>
                  <p className="mt-2 mb-6">
                    {data?.email}
                    {data.isEmailVerified ? (
                      <i className="fa-regular fa-circle-check ml-2 text-green-500"></i>
                    ) : (
                      <i className="fa-regular fa-circle-xmark ml-2 text-red-500"></i>
                    )}
                  </p>
                </div>
                <div className="ml-12">
                  <label className="font-bold">Date Of Birth</label>
                  <p className="mt-2 mb-6">{moment(data?.dob).format("DD-MM-YYYY")}</p>
                  <label className="font-bold">Languages</label>
                  <p className="mt-2 mb-6">
                    {data?.languages?.length
                      ? data.languages?.map((l, i) => (
                          <span key={i} className={`text-sm font-medium me-2 px-2.5 py-0.5 rounded ${badgeColor[Math.floor(Math.random() * 4)]}`}>
                            {l}
                          </span>
                        ))
                      : "NA"}
                  </p>
                </div>
                <div className="ml-12 flex flex-col">
                  <label className="font-bold">Approve Driver</label>
                  <div className="flex gap-4 mt-4">
                    {/* <button
                      // disabled={isDriverDocApproved()}
                      className={`${
                        isDriverDocApproved() ? "bg-green-600" : "bg-green-300 cursor-not-allowed"
                      } text-white px-5 py-2 rounded-lg hover:bg-green-300`}
                      // onClick={() => approvalProcess("approve", { doc_type: "pan", doc_id: data?.profile?.pan_card?._id })}
                    >
                      Approve
                    </button>
                    <button
                      className={`${
                        isDriverDocApproved() ? "bg-red-600" : "bg-red-300 cursor-not-allowed"
                      } text-white px-5 py-2 rounded-lg hover:bg-green-red`}
                      // disabled={isDriverDocApproved()}
                      // onClick={() => approvalProcess("reject", { doc_type: "pan", doc_id: data?.profile?.pan_card?._id })}
                    >
                      Reject
                    </button> */}
                    <label className="inline-flex items-center mb-5 cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                        checked={driverActive}
                        // {...(driverActive ? "checked" : "")}
                        onClick={() => {
                          setDriverActive(!driverActive);
                          updateDriverStatus(driverId);
                        }}
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      <span className="ms-3 text-sm capitalize font-medium text-gray-600">{driverActive ? "Active" : "Inactive"}</span>
                    </label>
                  </div>
                </div>
              </div>
            </section>
            {data?.profile?.aadhar_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Aadhar Card</p>
                <div className="flex gap-10">
                  {data?.profile?.aadhar_card?.aadhar_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.aadhar_card?.aadhar_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.profile?.aadhar_card?.aadhar_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.profile?.aadhar_card?.aadhar_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.aadhar_card?.aadhar_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.profile?.aadhar_card?.aadhar_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">Aadhar Card No</label>
                    <p className="mt-2 mb-6">{data?.profile?.aadhar_card?.aadhar_card_number}</p>
                    <label className="font-bold">Verification Status</label>
                    <div
                      className={`flex gap-10 mt-4 ${
                        data?.profile?.aadhar_card?.verification_status !== "approve" ? "items-center justify-center" : ""
                      }`}
                    >
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.aadhar_card?.verification_status)}`}>
                        {data?.profile?.aadhar_card?.verification_status}
                      </p>
                      {data?.profile?.aadhar_card?.verification_status === "pending" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300"
                            onClick={() => approvalProcess("approve", { doc_type: "aadhar", doc_id: driverId })}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300"
                            onClick={() => approvalProcess("reject", { doc_type: "aadhar", doc_id: driverId })}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                    {data?.profile?.aadhar_card?.reject_reason && (
                      <div className="mt-2">
                        <p className="text-center pt-3">Reject Reason</p>
                        <p>data?.profile?.aadhar_card?.reject_reason</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
            {data?.profile?.pan_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Pan Card</p>
                <div className="flex gap-10">
                  {data?.profile?.pan_card?.pan_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.pan_card?.pan_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.profile?.pan_card?.pan_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.profile?.pan_card?.pan_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.pan_card?.pan_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.profile?.pan_card?.pan_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">Pan Card No</label>
                    <p className="mt-2 mb-6">{data?.profile?.pan_card?.pan_card_number}</p>
                    <label className="font-bold">Verification Status</label>
                    <div
                      className={`flex gap-10 mt-4 ${
                        data?.profile?.pan_card?.verification_status !== "approve" ? "items-center justify-center" : ""
                      }`}
                    >
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.pan_card?.verification_status)}`}>
                        {data?.profile?.pan_card?.verification_status}
                      </p>
                      {data?.profile?.pan_card?.verification_status === "pending" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300"
                            onClick={() => approvalProcess("approve", { doc_type: "pan", doc_id: driverId })}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300"
                            onClick={() => approvalProcess("reject", { doc_type: "pan", doc_id: driverId })}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                    {data?.profile?.pan_card?.reject_reason && (
                      <div className="mt-2">
                        <p className="text-center pt-3">Reject Reasone</p>
                        <p>{data?.profile?.pan_card?.reject_reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
            {data?.profile?.driver_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Driving Licensce</p>
                <div className="flex gap-10">
                  {data?.profile?.driver_card?.driver_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.driver_card?.driver_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.profile?.driver_card?.driver_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.profile?.driver_card?.driver_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.profile?.driver_card?.driver_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.profile?.driver_card?.driver_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">DL No</label>
                    <p className="mt-2 mb-6">{data?.profile?.driver_card?.driver_card_number}</p>
                    <label className="font-bold">Verification Status</label>
                    <div
                      className={`flex gap-10 mt-4 ${
                        data?.profile?.driver_card?.verification_status !== "approve" ? "items-center justify-center" : ""
                      }`}
                    >
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.driver_card?.verification_status)}`}>
                        {data?.profile?.driver_card?.verification_status}
                      </p>
                      {data?.profile?.driver_card?.verification_status === "pending" && (
                        <>
                          <button
                            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300"
                            onClick={() => approvalProcess("approve", { doc_type: "dl", doc_id: driverId })}
                          >
                            Approve
                          </button>
                          <button
                            className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300"
                            onClick={() => approvalProcess("reject", { doc_type: "dl", doc_id: driverId })}
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                    {data?.profile?.driver_card?.reject_reason && (
                      <div className="mt-2">
                        <p className="text-center pt-3">Reject reason</p>
                        <p>{data?.profile?.driver_card?.reject_reason}</p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}
          </div>
          <div className="bg-white w-full my-8 p-4 rounded-lg">
            <section>
              <p className="text-lg font-semibold">Vehicle Profile</p>
              <div className="mt-4 flex">
                <div className="w-1/3">
                  <label className="font-bold">Vehicle Type</label>
                  <p className="mt-2 mb-6 capitalize">{data?.vehicleInfo[0]?.vehicle_type}</p>
                  <label className="font-bold">Vehicle Brand</label>
                  <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.vehicle_brand}</p>
                  <label className="font-bold">Vehicle Model</label>
                  <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.vehicle_model}</p>
                  <label className="font-bold">Vehicle Number</label>
                  <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.vehicle_number}</p>
                  {data?.vehicleInfo[0]?.vehicle_status !== "approve" ? (
                    <div className="flex gap-3">
                      <button
                        // disabled={
                        //   !data?.vehicleInfo[0]?.vehicle_type ||
                        //   !data?.vehicleInfo[0]?.vehicle_brand ||
                        //   !data?.vehicleInfo[0]?.vehicle_model ||
                        //   !data?.vehicleInfo[0]?.vehicle_number ||
                        //   // data?.vehicleInfo[0]?.vehicle_images?.length < 2 ||
                        //   !data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_front ||
                        //   !data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_back ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card_image_back ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card_image_front
                        // }
                        className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300"
                        onClick={() => approvalProcess("approve", { doc_type: "vehicle", doc_id: data?.vehicleInfo[0]?._id })}
                      >
                        Approve
                      </button>
                      <button
                        // disabled={
                        //   !data?.vehicleInfo[0]?.vehicle_type ||
                        //   !data?.vehicleInfo[0]?.vehicle_brand ||
                        //   !data?.vehicleInfo[0]?.vehicle_model ||
                        //   !data?.vehicleInfo[0]?.vehicle_number ||
                        //   // data?.vehicleInfo[0]?.vehicle_images?.length < 2 ||
                        //   !data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_front ||
                        //   !data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_back ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card_image_back ||
                        //   !data?.vehicleInfo[0]?.profile?.insurance_card_image_front
                        // }
                        className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300"
                        onClick={() => approvalProcess("reject", { doc_type: "vehicle", doc_id: data?.vehicleInfo[0]?._id })}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-4 items-end mt-2">
                      <div>
                        <p className="font-semibold pt-3">Status</p>
                        <p className="text-green-500">Approved</p>
                      </div>
                      <button
                        className="bg-yellow-500 text-white px-2 h-fit py-2 rounded-lg hover:bg-red-300"
                        onClick={() => approvalProcess("pending", { doc_type: "vehicle", doc_id: data?.vehicleInfo[0]?._id })}
                      >
                        Revert to Pending
                      </button>
                    </div>
                  )}
                  {data?.vehicleInfo[0]?.reject_reason && (
                    <div className="mt-2">
                      <p className="text-center pt-3">Reject Reason</p>
                      <p>{data?.vehicleInfo[0]?.reject_reason}</p>
                    </div>
                  )}
                </div>
                <div className="ml-12 flex w-2/3">
                  {data?.vehicleInfo[0]?.vehicle_images?.length &&
                    data?.vehicleInfo[0]?.vehicle_images.map((ele, idx) => (
                      <div key={idx} className="mt-4 mr-4 bg-slate-100 w-100 p-3 rounded-lg">
                        <img src={ele.url} alt="" onClick={() => window.open(ele.url)} />
                        <p className="text-center pt-3">{ele.filename}</p>
                      </div>
                    ))}
                </div>
              </div>
            </section>
            {data?.vehicleInfo[0]?.profile?.rc_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">RC</p>
                <div className="flex gap-10">
                  {data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">RC No</label>
                    <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.profile?.rc_card?.rc_card_number}</p>
                    {/* <label className="font-bold">Verification Status</label>
                    <div className="flex gap-10 items-center justify-center mt-4">
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.driver_card?.verification_status)}`}>
                        {data?.profile?.driver_card?.verification_status}
                      </p>
                      {data?.profile?.driver_card?.verification_status === "pending" && (
                        <>
                          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300">Approve</button>
                          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300">Reject</button>
                        </>
                      )}
                    </div> */}
                  </div>
                </div>
              </section>
            )}
            {data?.vehicleInfo[0]?.profile?.insurance_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Insurance</p>
                <div className="flex gap-10">
                  {data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.vehicleInfo[0]?.profile?.rc_card?.insurance_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">Insurance Card No.</label>
                    <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.profile?.insurance_card?.insurance_card_number}</p>
                    {/* <label className="font-bold">Verification Status</label>
                    <div className="flex gap-10 items-center justify-center mt-4">
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.driver_card?.verification_status)}`}>
                        {data?.profile?.driver_card?.verification_status}
                      </p>
                      {data?.profile?.driver_card?.verification_status === "pending" && (
                        <>
                          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300">Approve</button>
                          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300">Reject</button>
                        </>
                      )}
                    </div> */}
                  </div>
                </div>
              </section>
            )}
            {data?.vehicleInfo[0]?.profile?.tax_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Tax Card</p>
                <div className="flex gap-10">
                  {data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">Tax Card No.</label>
                    <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.profile?.tax_card?.tax_card_number}</p>
                    {/* <label className="font-bold">Verification Status</label>
                    <div className="flex gap-10 items-center justify-center mt-4">
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.driver_card?.verification_status)}`}>
                        {data?.profile?.driver_card?.verification_status}
                      </p>
                      {data?.profile?.driver_card?.verification_status === "pending" && (
                        <>
                          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300">Approve</button>
                          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300">Reject</button>
                        </>
                      )}
                    </div> */}
                  </div>
                </div>
              </section>
            )}
            {data?.vehicleInfo[0]?.profile?.fitness_card && (
              <section className="border-t-2 mt-6">
                <p className="text-lg font-semibold mt-4">Fitness</p>
                <div className="flex gap-10">
                  {data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_front && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_front}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_front)}
                      />
                      <p className="text-center pt-3">Front Image</p>
                    </div>
                  )}
                  {data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_back && (
                    <div className="mt-4 bg-slate-100 w-100 p-3 rounded-lg">
                      <img
                        src={data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_back}
                        alt=""
                        onClick={() => window.open(data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_image_back)}
                      />
                      <p className="text-center pt-3">Back Image</p>
                    </div>
                  )}
                  <div className="ml-12 mt-4">
                    <label className="font-bold">Fitness Card No.</label>
                    <p className="mt-2 mb-6">{data?.vehicleInfo[0]?.profile?.fitness_card?.fitness_card_number}</p>
                    {/* <label className="font-bold">Verification Status</label>
                    <div className="flex gap-10 items-center justify-center mt-4">
                      <p className={`capitalize font-semibold ${getStatusColor(data?.profile?.driver_card?.verification_status)}`}>
                        {data?.profile?.driver_card?.verification_status}
                      </p>
                      {data?.profile?.driver_card?.verification_status === "pending" && (
                        <>
                          <button className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-300">Approve</button>
                          <button className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-300">Reject</button>
                        </>
                      )}
                    </div> */}
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      )}
      {approvalPopup && (
        <ApprovalModal
          type={approveType}
          onSubmit={(comment) => {
            approveDoc({
              ...approvalDoc,
              status: approveType,
              comment,
            });
          }}
          onClose={() => {
            setApprovalPopup(false);
          }}
        />
      )}
    </>
  );
}

export default DriverInfo;
