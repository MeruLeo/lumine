import { Router } from "express";
import {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicketById,
  deleteTicketById,
  getTicketsByReporter,
  replyToTicket,
  getRepliesByTicket,
  getTicketByNumber,
} from "../controllers/ticket.controller";
import { authenticate } from "../../middlewares/auth.middleware";
import { verifyDeveloperOrAdmin } from "../../middlewares/user.isAdmin";
import { asyncHandler } from "../../utils/asyncHandler";

const router = Router();

router.get(
  "/",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(getAllTickets)
);
router.post("/", authenticate, asyncHandler(createTicket));
router.get(
  "/:ticketId",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(getTicketById)
);
router.put(
  "/:ticketId",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(updateTicketById)
);
router.delete(
  "/:ticketId",
  authenticate,
  verifyDeveloperOrAdmin,
  asyncHandler(deleteTicketById)
);
router.get(
  "/reporter/:reporterId",
  authenticate,
  asyncHandler(getTicketsByReporter)
);
router.post("/:ticketId/reply", authenticate, asyncHandler(replyToTicket));
router.get(
  "/:ticketId/replies",
  authenticate,
  asyncHandler(getRepliesByTicket)
);
router.get("/number/:number", authenticate, asyncHandler(getTicketByNumber));

export default router;
