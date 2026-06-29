import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../services/axios";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      dispatch(logout());

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 border-b border-white/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
            Ticket System
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
            {user?.role === "admin" ? "Admin Workspace" : "Support Workspace"}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden rounded-2xl border border-teal-100 bg-teal-50 px-4 py-2 text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{user?.name}</p>
            <p className="text-xs text-slate-600">{user?.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
