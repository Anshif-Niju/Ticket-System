import { useState } from "react";
import api from "../services/axios";
import { ticketSchema } from "../lib/validation";

const TicketForm = ({ onTicketCreated }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setTicket((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = ticketSchema.safeParse(ticket);

    if (!result.success) {
      setError(result.error.issues[0]?.message || "Please check the ticket form");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/tickets", result.data);

      setTicket({
        title: "",
        description: "",
        category: "",
        priority: "Low",
      });

      if (onTicketCreated) {
        await onTicketCreated();
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create ticket");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-left md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Title</span>
          <input
            type="text"
            name="title"
            placeholder="Printer issue in finance room"
            value={ticket.title}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-left md:col-span-2">
          <span className="text-sm font-semibold text-slate-700">Description</span>
          <textarea
            name="description"
            placeholder="Describe the problem in detail..."
            value={ticket.description}
            onChange={handleChange}
            rows={5}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-slate-700">Category</span>
          <input
            type="text"
            name="category"
            placeholder="Hardware"
            value={ticket.category}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          />
        </label>

        <label className="flex flex-col gap-2 text-left">
          <span className="text-sm font-semibold text-slate-700">Priority</span>
          <select
            name="priority"
            value={ticket.priority}
            onChange={handleChange}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:bg-white"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>
      </div>

      {error ? (
        <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="rounded-2xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? "Creating..." : "Create Ticket"}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;
