// controllers/ticketController.ts
import { Request, Response } from "express";
import mongoose from "mongoose";
import { TicketModel } from "../../models/ticket";
import { errorResponse, successResponse } from "../../utils/responses";
import { TicketReplyModel } from "../../models/ticketReply";
import { generateUniqueTicketNumber } from "../../utils/ticketNumberGen";

// -------------------- Create Ticket --------------------
export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, message, priority, reporterId, category, projectId } =
      req.body;

    if (!title || !message || !priority || !reporterId || !projectId) {
      return errorResponse(res, 400, "Missing required fields");
    }

    const ticketNumber = await generateUniqueTicketNumber();

    const newTicket = await TicketModel.create({
      title,
      message,
      status: "open",
      priority,
      reporterId,
      category,
      projectId,
      number: ticketNumber,
    });

    successResponse(res, 201, {
      message: "Ticket created successfully",
      ticket: newTicket,
    });
  } catch (err) {
    errorResponse(res, 500, "Error creating ticket", err);
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  try {
    const {
      status,
      priority,
      category,
      reporterId,
      search,
      page = 1,
      limit = 10,
    } = req.query;

    const query: Record<string, any> = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (category) query.category = category;
    if (reporterId) query.reporterId = reporterId;
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tickets = await TicketModel.find(query)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .populate("reporterId", "fullName role")
      .lean();

    const total = await TicketModel.countDocuments(query);

    successResponse(res, 200, {
      message: "Tickets fetched successfully",
      tickets,
      pagination: {
        total,
        page: +page,
        totalPages: Math.ceil(total / +limit),
      },
    });
  } catch (err) {
    errorResponse(res, 500, "Error fetching tickets", err);
  }
};

// -------------------- Get Ticket by ID --------------------
export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return errorResponse(res, 400, "Invalid ticket ID format");
    }

    const ticket = await TicketModel.findById(ticketId)
      .populate("reporterId", "fullName role")
      .lean();

    if (!ticket) return errorResponse(res, 404, "Ticket not found");

    successResponse(res, 200, { ticket });
  } catch (err) {
    errorResponse(res, 500, "Error fetching ticket", err);
  }
};

// -------------------- Update Ticket --------------------
export const updateTicketById = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { status, message, title, priority, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return errorResponse(res, 400, "Invalid ticket ID format");
    }

    const allowedStatuses = ["open", "in_progress", "resolved", "closed"];
    const allowedPriorities = ["low", "medium", "high", "urgent"];

    const updateData: Record<string, any> = {};

    if (status && allowedStatuses.includes(status)) updateData.status = status;
    if (priority && allowedPriorities.includes(priority))
      updateData.priority = priority;
    if (message) updateData.message = message;
    if (title) updateData.title = title;
    if (category) updateData.category = category;

    const updatedTicket = await TicketModel.findByIdAndUpdate(
      ticketId,
      updateData,
      {
        new: true,
      }
    )
      .populate("reporterId", "fullName role")
      .populate("projectId", "name")
      .lean();

    if (!updatedTicket) return errorResponse(res, 404, "Ticket not found");

    successResponse(res, 200, {
      message: "Ticket updated successfully",
      ticket: updatedTicket,
    });
  } catch (err) {
    errorResponse(res, 500, "Error updating ticket", err);
  }
};

// -------------------- Delete Ticket --------------------
export const deleteTicketById = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(ticketId)) {
      return errorResponse(res, 400, "Invalid ticket ID format");
    }

    const deleted = await TicketModel.findByIdAndDelete(ticketId);

    if (!deleted) return errorResponse(res, 404, "Ticket not found");

    successResponse(res, 200, { message: "Ticket deleted successfully" });
  } catch (err) {
    errorResponse(res, 500, "Error deleting ticket", err);
  }
};

// -------------------- Get Tickets by Reporter --------------------
export const getTicketsByReporter = async (req: Request, res: Response) => {
  try {
    const { reporterId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(reporterId)) {
      return errorResponse(res, 400, "Invalid reporter ID format");
    }

    const tickets = await TicketModel.find({ reporterId }).lean();

    successResponse(res, 200, { tickets });
  } catch (err) {
    errorResponse(res, 500, "Error fetching reporter tickets", err);
  }
};

export const replyToTicket = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const { message, attachments } = req.body;
    const senderId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(ticketId))
      return errorResponse(res, 400, "Invalid ticket ID");

    const reply = await TicketReplyModel.create({
      ticketId,
      senderId,
      message,
      attachments,
    });

    await TicketModel.findByIdAndUpdate(ticketId, {
      status: "in_progress",
    });

    successResponse(res, 201, { message: "Reply added", reply });
  } catch (err) {
    errorResponse(res, 500, "Failed to reply", err);
  }
};

// Get all replies for a ticket
export const getRepliesByTicket = async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;

    const replies = await TicketReplyModel.find({ ticketId })
      .populate("senderId", "fullName role")
      .sort({ createdAt: 1 });

    successResponse(res, 200, { replies });
  } catch (err) {
    errorResponse(res, 500, "Failed to get replies", err);
  }
};
