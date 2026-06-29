import { createSlice } from "@reduxjs/toolkit";

const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets = action.payload;
      state.error = null;
    },
    addTicket: (state, action) => {
      state.tickets.unshift(action.payload);
      state.error = null;
    },
    removeTicket: (state, action) => {
      state.tickets = state.tickets.filter(
        (ticket) => ticket._id !== action.payload
      );
      state.error = null;
    },
    setTicketLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTicketError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTickets,
  addTicket,
  removeTicket,
  setTicketLoading,
  setTicketError,
} = ticketSlice.actions;

export default ticketSlice.reducer;
