import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";

// Create Ticket (Admin)
export const createTicket = async (req, res) => {
  try {
    const { title, description, category, priority } = req.body;

    if (!title || !description || !category || !priority) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const ticket = await Ticket.create({
      title,
      description,
      category,
      priority,
    });

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Tickets (Admin)
export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate(
      "assignedAgent",
      "name email"
    );

    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Ticket
export const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid Ticket ID" });
}
    const ticket = await Ticket.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Ticket
export const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid Ticket ID" });

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket)
      return res.status(404).json({ message: "Ticket not found" });

    res.json({ message: "Ticket deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Assign Ticket
export const assignTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { assignedAgent } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(assignedAgent)
    ) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    const agent = await User.findById(assignedAgent);

    if (!agent || agent.role !== "support") {
      return res.status(404).json({
        message: "Support Agent not found",
      });
    }

    const ticket = await Ticket.findByIdAndUpdate(
      id,
      {
        assignedAgent,
      },
      { new: true }
    ).populate("assignedAgent", "name email");

    if (!ticket)
      return res.status(404).json({
        message: "Ticket not found",
      });

    res.json(ticket);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// My Tickets (Support)
export const getMyTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({
      assignedAgent: req.user._id,
    }).populate("assignedAgent", "name email");

    res.json(tickets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
