import TicketCard from "./TicketCard";

const TicketList = ({ tickets, agents = [], onTicketUpdated, role }) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {tickets.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center text-slate-600 lg:col-span-2">
          No tickets found
        </div>
      ) : (
        tickets.map((ticket) => (
          <TicketCard
            key={ticket._id}
            ticket={ticket}
            agents={agents}
            onTicketUpdated={onTicketUpdated}
            role={role}
          />
        ))
      )}
    </div>
  );
};

export default TicketList;
