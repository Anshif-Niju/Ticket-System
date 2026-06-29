import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../services/axios";
import { setUser } from "../features/auth/authSlice";
import { loginSchema } from "../lib/validation";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && user) {
      navigate(user.role === "admin" ? "/admin" : "/support", {
        replace: true,
      });
    }
  }, [loading, navigate, user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Please check your login details");
      return;
    }

    setSubmitting(true);

    try {
      const { data } = await api.post("/auth/login", result.data);

      dispatch(setUser(data.user));

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/support");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
      <div className="grid w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/80 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur lg:grid-cols-[1.15fr_0.85fr]">

        <section className="px-6 py-10 sm:px-10 lg:px-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-teal-700">
              Welcome Back
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Sign in to your account
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Use your seeded admin or support credentials to enter the dashboard.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <label className="flex flex-col gap-2 text-left">
                <span className="text-sm font-semibold text-slate-700">Email</span>
                <input
                  type="email"
                  name="email"
                  placeholder="enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </label>

              <label className="flex flex-col gap-2 text-left">
                <span className="text-sm font-semibold text-slate-700">
                  Password
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
                />
              </label>

              {error ? (
                <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
