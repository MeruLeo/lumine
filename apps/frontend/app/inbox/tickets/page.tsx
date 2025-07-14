"use client";

import { TicketPreviwe } from "@/components/inbox/tickets/ticketPreview";
import { useAuth } from "@/hooks/useAuth";
import { useTicket } from "@/hooks/useTiecket";
import { useEffect } from "react";

export default function TicketsPage() {
  const { getTicketsByReporter, tickets } = useTicket();
  const { getMe, user } = useAuth();

  useEffect(() => {
    getMe();
    getTicketsByReporter(user?._id);
  });

  return (
    <div>
      <ul>
        {tickets.map((ticket) => (
          <TicketPreviwe
            key={ticket._id}
            category={ticket.category}
            createdAt={ticket.createdAt}
            number={ticket}
          />
        ))}
      </ul>
    </div>
  );
}
