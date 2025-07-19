import { TicketModel } from "../models/ticket";

export const generateUniqueTicketNumber = async (): Promise<number> => {
  let unique = false;
  let ticketNumber = 0;

  while (!unique) {
    ticketNumber = Math.floor(10000 + Math.random() * 90000);
    const existing = await TicketModel.findOne({ number: ticketNumber });
    if (!existing) unique = true;
  }

  return ticketNumber;
};
