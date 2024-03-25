import { useNavigate, useParams } from "react-router-dom";

function DriverInfo() {
  const params = useParams();
  const navigate = useNavigate();
  return (
    <div className="px-4 py-8">
      <p className="text-3xl font-semibold pb-3">
        <span onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl mr-4 cursor-pointer"></i>
        </span>
        Driver Info
      </p>
      <span className="">{params.id}</span>
    </div>
  );
}

export default DriverInfo;
