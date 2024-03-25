import { Routes, Route, Navigate } from "react-router-dom";
import GlobalSidebar from "./components/common/GlobalSidebar";
import Login from "./components/login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import Sidebar from "./components/common/Sidebar";
import Drivers from "./components/drivers/Drivers";

const App = () => {
  const userToken = useSelector((state) => state.user)?.token;
  return (
    <div className="flex">
      {userToken ? <Sidebar /> : ""}
      <div className="w-full">
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/dashboard"
            exact
            element={
              <ProtectedRoute>
                <h1>Dashboarnnd</h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drivers"
            exact
            element={
              <ProtectedRoute>
                <Drivers />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={userToken ? <Navigate to={"/dashboard"} /> : <Navigate to={"/login"} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
