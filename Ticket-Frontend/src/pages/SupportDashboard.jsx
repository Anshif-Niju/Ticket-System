import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import TicketList from "../components/TicketList";
import api from "../services/axios";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyTickets = async () => {
      try {
        const { data } = await api.get("/tickets/my-tickets");
        setTickets(data.data);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load assigned tickets"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyTickets();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-800 px-6 py-8 text-left text-white shadow-[0_25px_70px_rgba(13,148,136,0.22)] sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">
            Support Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
            Work the tickets assigned to you and keep statuses up to date.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-emerald-50/85 sm:text-base">
            Support agents only see their own tickets here. Update status from
            this page and the admin dashboard will pick up the change.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
            <p className="text-sm font-medium text-slate-500">Assigned Tickets</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {tickets.length}
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
            <p className="text-sm font-medium text-slate-500">In Progress</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {tickets.filter((ticket) => ticket.status === "In Progress").length}
            </p>
          </div>
          <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
            <p className="text-sm font-medium text-slate-500">Resolved</p>
            <p className="mt-3 text-4xl font-semibold text-slate-900">
              {tickets.filter((ticket) => ticket.status === "Resolved").length}
            </p>
          </div>
        </section>

        <section>
          <div className="mb-4 text-left">
            <h2 className="text-2xl font-semibold text-slate-900">
              My Tickets
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Update only the status of tickets assigned to you.
            </p>
          </div>

          {error ? (
            <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {loading ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/90 px-6 py-12 text-center text-slate-600">
              Loading assigned tickets...
            </div>
          ) : (
            <TicketList
              tickets={tickets}
              onTicketUpdated={async () => {
                const { data } = await api.get("/tickets/my-tickets");
                setTickets(data.data);
              }}
              role="support"
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default SupportDashboard;
