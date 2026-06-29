import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import SupportDashboard from "./pages/SupportDashboard";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import api from "./services/axios";
import { setUser } from "./features/auth/authSlice";

function App() {

const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/auth/me");

        dispatch(setUser(data.user));
      } catch (error) {
        console.log("Not Logged In");
      }
    };

    fetchUser();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/support"
        element={
          <ProtectedRoute allowedRoles={["support"]}>
            <SupportDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
