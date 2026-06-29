const TicketCard = ({ ticket }) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px",
        marginBottom: "15px",
      }}
    >
      <h3>{ticket.title}</h3>

      <p>{ticket.description}</p>

      <p>
        <strong>Category:</strong> {ticket.category}
      </p>

      <p>
        <strong>Priority:</strong> {ticket.priority}
      </p>

      <p>
        <strong>Status:</strong> {ticket.status}
      </p>

      <p>
        <strong>Assigned To:</strong>{" "}
        {ticket.assignedAgent?.name || "Not Assigned"}
      </p>

      <button>Assign</button>

      <button style={{ marginLeft: "10px" }}>
        Delete
      </button>
    </div>
  );
};

export default TicketCard;
