import { Schema, model, Document } from "mongoose";
import { ITicketReply } from "../../../../packages/types/dist/index";

export interface TicketReplyDocument extends ITicketReply, Document {}

const ticketReplySchema = new Schema<TicketReplyDocument>(
  {
    ticketId: { type: Schema.Types.ObjectId, ref: "Ticket", required: true },
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export const TicketReplyModel = model<TicketReplyDocument>(
  "TicketReply",
  ticketReplySchema
);
