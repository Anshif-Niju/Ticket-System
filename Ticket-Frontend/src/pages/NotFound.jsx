import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="rounded-[2rem] border border-white/70 bg-white/90 px-8 py-12 text-center shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-700">
          404 Error
        </p>
        <h1 className="mt-4 text-5xl font-semibold text-slate-900">Page Not Found</h1>
        <p className="mt-4 text-sm text-slate-600">
          The page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="mt-6 inline-flex rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
