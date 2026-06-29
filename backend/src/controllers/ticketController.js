import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createTicket = asyncHandler(async (req, res) => {
  const { title, description, category, priority } = req.body;

  const ticket = await Ticket.create({
    title,
    description,
    category,
    priority,
  });

  res.status(201).json({
    status: "success",
    data: ticket,
  });
});

export const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find()
    .populate("assignedAgent", "name email")
    .sort({ createdAt: -1 });

  res.status(200).json({
    status: "success",
    data: tickets,
  });
});

export const getSupportAgents = asyncHandler(async (req, res) => {
  const agents = await User.find({ role: "support" })
    .select("name email")
    .sort({ name: 1 });

  res.status(200).json({
    status: "success",
    data: agents,
  });
});

export const updateTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid Ticket ID", 400);
  }

  const ticket = await Ticket.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  }).populate("assignedAgent", "name email");

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

export const deleteTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid Ticket ID", 400);
  }

  const ticket = await Ticket.findByIdAndDelete(id);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  res.status(200).json({
    status: "success",
    message: "Ticket deleted successfully",
  });
});

export const assignTicket = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assignedAgent } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(id) ||
    !mongoose.Types.ObjectId.isValid(assignedAgent)
  ) {
    throw new AppError("Invalid ID", 400);
  }

  const agent = await User.findById(assignedAgent);

  if (!agent || agent.role !== "support") {
    throw new AppError("Support Agent not found", 404);
  }

  const ticket = await Ticket.findByIdAndUpdate(
    id,
    {
      assignedAgent,
    },
    { new: true, runValidators: true }
  ).populate("assignedAgent", "name email");

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

export const updateMyTicketStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invalid Ticket ID", 400);
  }

  const ticket = await Ticket.findById(id);

  if (!ticket) {
    throw new AppError("Ticket not found", 404);
  }

  if (
    !ticket.assignedAgent ||
    ticket.assignedAgent.toString() !== req.user._id.toString()
  ) {
    throw new AppError("You can only update tickets assigned to you", 403);
  }

  ticket.status = status;
  await ticket.save();
  await ticket.populate("assignedAgent", "name email");

  res.status(200).json({
    status: "success",
    data: ticket,
  });
});

export const getMyTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({
    assignedAgent: req.user._id,
  })
    .populate("assignedAgent", "name email")
    .sort({ updatedAt: -1 });

  res.status(200).json({
    status: "success",
    data: tickets,
  });
});
