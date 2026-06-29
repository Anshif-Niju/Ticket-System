import express from "express";

import {
  createTicket,
  getAllTickets,
  getSupportAgents,
  updateTicket,
  deleteTicket,
  assignTicket,
  getMyTickets,
  updateMyTicketStatus,
} from "../controllers/ticketController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import {
  assignTicketSchema,
  createTicketSchema,
  ticketIdParamSchema,
  updateTicketSchema,
  updateTicketStatusSchema,
} from "../validations/ticketValidation.js";

const router = express.Router();

// Support Agent
router.get("/my-tickets", protect, authorize("support"), getMyTickets);
router.patch(
  "/:id/status",
  protect,
  authorize("support"),
  validate(updateTicketStatusSchema),
  updateMyTicketStatus
);

// Admin
router.post("/", protect, authorize("admin"), validate(createTicketSchema), createTicket);

router.get("/", protect, authorize("admin"), getAllTickets);

router.get("/support-agents", protect, authorize("admin"), getSupportAgents);

router.put("/:id", protect, authorize("admin"), validate(updateTicketSchema), updateTicket);

router.delete("/:id", protect, authorize("admin"), validate(ticketIdParamSchema), deleteTicket);

router.patch(
  "/:id/assign",
  protect,
  authorize("admin"),
  validate(assignTicketSchema),
  assignTicket
);

export default router;
