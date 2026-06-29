import api from "../services/axios";
import { useState } from "react";

const statusClasses = {
  Open: "bg-amber-100 text-amber-800",
  "In Progress": "bg-sky-100 text-sky-800",
  Resolved: "bg-emerald-100 text-emerald-800",
};

const priorityClasses = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-orange-100 text-orange-700",
  High: "bg-rose-100 text-rose-700",
};

const TicketCard = ({ ticket, agents = [], onTicketUpdated, role }) => {
  const [selectedAgent, setSelectedAgent] = useState(
    ticket.assignedAgent?._id || ""
  );
  const [assigning, setAssigning] = useState(false);
  const [status, setStatus] = useState(ticket.status);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    try {
      await api.delete(`/tickets/${ticket._id}`);

      if (onTicketUpdated) {
        await onTicketUpdated();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete ticket");
    }
  };

  const handleAssign = async () => {
    if (!selectedAgent) {
      setError("Please select a support agent");
      return;
    }

    setError("");
    setAssigning(true);

    try {
      await api.patch(`/tickets/${ticket._id}/assign`, {
        assignedAgent: selectedAgent,
      });

      if (onTicketUpdated) {
        await onTicketUpdated();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to assign ticket");
    } finally {
      setAssigning(false);
    }
  };

  const handleStatusUpdate = async () => {
    setError("");
    setUpdatingStatus(true);

    try {
      await api.patch(`/tickets/${ticket._id}/status`, { status });

      if (onTicketUpdated) {
        await onTicketUpdated();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const showAdminControls = role === "admin";
  const showSupportControls = role === "support";

  return (
    <article className="rounded-[2rem] border border-white/70 bg-white/95 p-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-left text-xl font-semibold text-slate-900">
            {ticket.title}
          </h3>
          <p className="mt-2 text-left text-sm leading-6 text-slate-600">
            {ticket.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClasses[ticket.status]}`}
          >
            {ticket.status}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClasses[ticket.priority]}`}
          >
            {ticket.priority} Priority
          </span>
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-left text-sm text-slate-600 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 px-4 py-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Category
          </p>
          <p className="mt-1 font-medium text-slate-900">{ticket.category}</p>
        </div>

        {showAdminControls ? (
          <div className="rounded-2xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Assigned To
            </p>
            <p className="mt-1 font-medium text-slate-900">
              {ticket.assignedAgent?.name || "Not Assigned"}
            </p>
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      {showAdminControls ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <select
            value={selectedAgent}
            onChange={(e) => setSelectedAgent(e.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          >
            <option value="">Select Support Agent</option>
            {agents.map((agent) => (
              <option key={agent._id} value={agent._id}>
                {agent.name} ({agent.email})
              </option>
            ))}
          </select>

          <button
            onClick={handleAssign}
            disabled={assigning || agents.length === 0}
            className="rounded-2xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {assigning ? "Assigning..." : "Assign"}
          </button>

          <button
            onClick={handleDelete}
            className="rounded-2xl bg-rose-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      ) : null}

      {showSupportControls ? (
        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="min-w-0 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <button
            onClick={handleStatusUpdate}
            disabled={updatingStatus}
            className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {updatingStatus ? "Updating..." : "Update Status"}
          </button>
        </div>
      ) : null}
    </article>
  );
};

export default TicketCard;
