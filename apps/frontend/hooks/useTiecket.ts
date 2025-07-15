import { useTicketStore } from "@/stores/ticket.store";

export const useTicket = () => {
  const {
    tickets,
    selectedTicket,
    error,
    loading,
    pagination,
    replies,
    clearSelected,
    createTicket,
    deleteTicket,
    getAllTickets,
    getRepliesByTicket,
    getTicketById,
    getTicketsByReporter,
    replyToTicket,
    getTicketByNumber,
    updateTicket,
  } = useTicketStore();

  return {
    tickets,
    selectedTicket,
    error,
    loading,
    pagination,
    replies,
    clearSelected,
    createTicket,
    deleteTicket,
    getAllTickets,
    getRepliesByTicket,
    getTicketById,
    getTicketsByReporter,
    getTicketByNumber,
    replyToTicket,
    updateTicket,
  };
};
