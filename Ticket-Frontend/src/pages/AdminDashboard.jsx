import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";
import api from "../services/axios";

import {
  setTicketError,
  setTicketLoading,
  setTickets,
} from "../features/ticket/ticketSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { tickets, loading, error } = useSelector((state) => state.ticket);
  const [agents, setAgents] = useState([]);

  const fetchTickets = async () => {
    dispatch(setTicketLoading(true));

    try {
      const { data } = await api.get("/tickets");
      dispatch(setTickets(data.data));
    } catch (error) {
      dispatch(
        setTicketError(error.response?.data?.message || "Failed to load tickets")
      );
    } finally {
      dispatch(setTicketLoading(false));
    }
  };

  const fetchSupportAgents = async () => {
    try {
      const { data } = await api.get("/tickets/support-agents");
      setAgents(data.data);
    } catch (error) {
      dispatch(
        setTicketError(
          error.response?.data?.message || "Failed to load support agents"
        )
      );
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchSupportAgents();
    const intervalId = setInterval(fetchTickets, 8000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] bg-slate-900 px-6 py-8 text-left text-white shadow-[0_25px_70px_rgba(15,23,42,0.22)] sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-300">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-5xl">
              Manage tickets, assign support, and track every update live.
            </h1>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
              <p className="text-sm font-medium text-slate-500">Total Tickets</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">
                {tickets.length}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
              <p className="text-sm font-medium text-slate-500">Support Agents</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">
                {agents.length}
              </p>
            </div>
            <div className="rounded-[2rem] border border-white/70 bg-white/90 p-5">
              <p className="text-sm font-medium text-slate-500">Open Tickets</p>
              <p className="mt-3 text-4xl font-semibold text-slate-900">
                {tickets.filter((ticket) => ticket.status === "Open").length}
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-4 text-left">
            <h2 className="text-2xl font-semibold text-slate-900">
              Create Ticket
            </h2>
          </div>
          <TicketForm onTicketCreated={fetchTickets} />
        </section>

        <section>
          <div className="mb-4 flex flex-col gap-2 text-left sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                All Tickets
              </h2>
            </div>
          </div>

          {error ? (
            <p className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          ) : null}

          {loading ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/90 px-6 py-12 text-center text-slate-600">
              Loading tickets...
            </div>
          ) : (
            <TicketList
              tickets={tickets}
              agents={agents}
              onTicketUpdated={fetchTickets}
              role="admin"
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
