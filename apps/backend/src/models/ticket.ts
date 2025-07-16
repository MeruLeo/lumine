import mongoose, { model, Schema, Document, Types } from "mongoose";
import type { ITicket } from "../../../../packages/types/dist/index";

const ticketSchema = new Schema<ITicket>({
  title: { type: String, required: true },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ["open", "in_progress", "closed"],
    default: "open",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    default: "medium",
  },
  reporterId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  category: {
    type: String,
    enum: ["financial", "work", "teach", "other"],
    default: null,
  },
  number: { required: true, type: Number, unique: true },
  projectId: { required: false, type: Schema.Types.ObjectId, ref: "Project" },
});

export const TicketModel = model<ITicket>("Ticket", ticketSchema);
