import { Routes, Route, Navigate } from "react-router-dom";
import GlobalSidebar from "./components/common/GlobalSidebar";
import Login from "./components/login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { getUserFromStore } from "./utils/helper";

const App = () => {
  const isLoggedIn = getUserFromStore()?.token;
  return (
    <>
      {isLoggedIn ? <GlobalSidebar /> : ""}
      <div>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route
            path="/dashboard"
            exact
            element={
              <ProtectedRoute>
                <h1>Dashboard</h1>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
