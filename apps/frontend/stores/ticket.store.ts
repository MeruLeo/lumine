import { create } from "zustand";
import { devtools } from "zustand/middleware";

import API from "@/lib/axios";

export type TicketStatus = "open" | "in_progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketCategory = "financial" | "work" | "teach" | "other";

export interface Ticket {
  _id: string;
  title: string;
  message: string;
  status: TicketStatus;
  priority: TicketPriority;
  reporterId: {
    _id: string;
    fullName: string;
    role: string;
  };
  category: TicketCategory;
  projectId?: string;
  number: number;
  createdAt: string | Date;
  updatedAt: string;
}

export interface TicketReply {
  _id: string;
  message: string;
  senderId: {
    _id: string;
    fullName: string;
    role: string;
  };
  ticketId: string;
  attachments?: string[];
  createdAt: string;
}

interface TicketPagination {
  total: number;
  page: number;
  totalPages: number;
}

interface TicketStore {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  replies: TicketReply[];
  pagination: TicketPagination | null;
  loading: boolean;
  error: string | null;

  getAllTickets: (filters?: {
    status?: TicketStatus;
    priority?: TicketPriority;
    category?: string;
    reporterId?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => Promise<void>;

  getTicketById: (id: string) => Promise<void>;
  createTicket: (data: Partial<Ticket>) => Promise<void>;
  updateTicket: (id: string, data: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: string) => Promise<void>;
  getTicketsByReporter: (reporterId: string | undefined) => Promise<void>;
  getTicketByNumber: (number: number) => Promise<void>;

  replyToTicket: (
    ticketId: string,
    data: { message: string; attachments?: string[] },
  ) => Promise<void>;
  getRepliesByTicket: (ticketId: string) => Promise<void>;

  clearSelected: () => void;
}

export const useTicketStore = create<TicketStore>()(
  devtools((set, get) => ({
    tickets: [],
    selectedTicket: null,
    replies: [],
    pagination: null,
    loading: false,
    error: null,

    getAllTickets: async (filters = {}) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get("/tickets", { params: filters });

        set({
          tickets: res.data.data.tickets,
          pagination: res.data.data.pagination,
        });
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error fetching tickets" });
      } finally {
        set({ loading: false });
      }
    },

    getTicketById: async (id: string) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get(`/tickets/${id}`);

        set({ selectedTicket: res.data.ticket });
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error fetching ticket" });
      } finally {
        set({ loading: false });
      }
    },

    createTicket: async (data) => {
      try {
        set({ loading: true, error: null });
        const res = await API.post("/tickets", data);
        const newTicket = res.data.ticket;

        set((state) => ({
          tickets: [newTicket, ...state.tickets],
          error: null,
        }));
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error creating ticket" });
      } finally {
        set({ loading: false });
      }
    },

    updateTicket: async (id, data) => {
      try {
        set({ loading: true, error: null });
        const res = await API.put(`/tickets/${id}`, data);

        set((state) => ({
          tickets: state.tickets.map((t) =>
            t._id === id ? res.data.ticket : t,
          ),
        }));
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error updating ticket" });
      } finally {
        set({ loading: false });
      }
    },

    deleteTicket: async (id) => {
      try {
        set({ loading: true, error: null });
        await API.delete(`/tickets/${id}`);
        set((state) => ({
          tickets: state.tickets.filter((t) => t._id !== id),
        }));
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error deleting ticket" });
      } finally {
        set({ loading: false });
      }
    },

    getTicketsByReporter: async (reporterId) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get(`/tickets/reporter/${reporterId}`);

        set({ tickets: res.data.data.tickets });
      } catch (err: any) {
        set({
          error:
            err.response?.data?.message || "Error fetching reporter's tickets",
        });
      } finally {
        set({ loading: false });
      }
    },

    replyToTicket: async (ticketId, data) => {
      try {
        set({ loading: true, error: null });
        await API.post(`/tickets/${ticketId}/reply`, data);
        await get().getRepliesByTicket(ticketId);
      } catch (err: any) {
        set({
          error: err.response?.data?.message || "Error replying to ticket",
        });
      } finally {
        set({ loading: false });
      }
    },

    getRepliesByTicket: async (ticketId) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get(`/tickets/${ticketId}/replies`);

        set({ replies: res.data.data.replies });
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error fetching replies" });
      } finally {
        set({ loading: false });
      }
    },

    getTicketByNumber: async (number: number) => {
      try {
        set({ loading: true, error: null });
        const res = await API.get(`/tickets/number/${number}`);

        set({ selectedTicket: res.data.ticket });
      } catch (err: any) {
        set({ error: err.response?.data?.message || "Error fetching ticket" });
      } finally {
        set({ loading: false });
      }
    },

    clearSelected: () => set({ selectedTicket: null, replies: [] }),
  })),
);
