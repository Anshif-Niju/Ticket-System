import express from "express";

import {
  createTicket,
  getAllTickets,
  updateTicket,
  deleteTicket,
  assignTicket,
  getMyTickets,
} from "../controllers/ticketController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

// Support Agent
router.get("/my-tickets", protect, authorize("support"), getMyTickets);

// Admin
router.post("/", protect, authorize("admin"), createTicket);

router.get("/", protect, authorize("admin"), getAllTickets);

router.put("/:id", protect, authorize("admin"), updateTicket);

router.delete("/:id", protect, authorize("admin"), deleteTicket);

router.patch(
  "/:id/assign",
  protect,
  authorize("admin"),
  assignTicket
);

export default router;
