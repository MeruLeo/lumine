import { Types } from "mongoose";

export interface ITicket {
  title: string;
  message: string;
  status: "open" | "in_progress" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  reporterId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  category?: "financial" | "work" | "teach" | "other";
  projectId?: Types.ObjectId;
  number: number;
}

export interface ITicketReply {
  ticketId: Types.ObjectId;
  senderId: Types.ObjectId;
  message: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}
