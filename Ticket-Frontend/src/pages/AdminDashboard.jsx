import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import TicketForm from "../components/TicketForm";
import TicketList from "../components/TicketList";

import { getAllTickets } from "../features/ticket/ticketSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();

  const { tickets, loading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getAllTickets());
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      <h1>Admin Dashboard</h1>

      <TicketForm />

      <hr />

      <h2>All Tickets</h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <TicketList tickets={tickets} />
      )}
    </div>
  );
};

export default AdminDashboard;
