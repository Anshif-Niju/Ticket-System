import TicketCard from "./TicketCard";

const TicketList = ({ tickets }) => {
  return (
    <>
      {tickets.length === 0 ? (
        <h3>No Tickets Found</h3>
      ) : (
        tickets.map((ticket) => (
          <TicketCard key={ticket._id} ticket={ticket} />
        ))
      )}
    </>
  );
};

export default TicketList;
