"use client";

import { InboxIcon } from "@/components/icons/icons";
import { TicketPreviwe } from "@/components/inbox/tickets/ticketPreview";
import PersianDate from "@/components/persianDate";
import { useAuth } from "@/hooks/useAuth";
import { useTicket } from "@/hooks/useTiecket";
import { useTicketStore } from "@/stores/ticket.store";
import PersianNumber from "@/utils/convertToPersianNumber";
import { useEffect } from "react";

export default function TicketsPage() {
  const { getTicketsByReporter, getAllTickets } = useTicket();
  const tickets = useTicketStore((state) => state.tickets);

  const { getMe, user } = useAuth();

  useEffect(() => {
    getMe();
  }, []);

  useEffect(() => {
    if (!user) return;
    if (user.role === "model") getTicketsByReporter(user._id);
    else getAllTickets();
  }, [user]);

  return (
    <div className="load-page">
      <ul className="flex flex-wrap gap-4">
        {tickets.length > 0 ? (
          tickets.map((ticket) =>
            ticket && ticket._id ? (
              <TicketPreviwe
                key={ticket._id}
                category={ticket.category}
                createdAt={<PersianDate createdAt={ticket.createdAt} />}
                number={ticket.number}
                status={ticket.status}
                title={ticket.title}
              />
            ) : null,
          )
        ) : (
          <p className="text-center w-full my-32 flex flex-col justify-center items-center text-Ash_Gray text-lg mt-8">
            <InboxIcon />
            اینجا خبری نیست
          </p>
        )}
      </ul>
    </div>
  );
}
