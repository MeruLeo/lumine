"use client";

import { useEffect, useState } from "react";
import { useTicketStore } from "@/stores/ticket.store";
import { useParams } from "next/navigation";
import PersianDate from "@/components/persianDate";
import { Button, Divider, Input, Textarea, toast } from "@heroui/react";
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ClockOrgIcon,
  StartDateIcon,
  UserIcon,
} from "@/components/icons/icons";
import { TicketHeader } from "@/components/inbox/tickets/ticket/ticketHeader";
import PersianNumber from "@/utils/convertToPersianNumber";
import { useAuth } from "@/hooks/useAuth";
import { useTicket } from "@/hooks/useTiecket";

const roleColors: Record<string, string> = {
  admin: "text-yellow-500",
  model: "text-green-500",
  developer: "text-blue-500",
};

export default function TicketDetailPage() {
  const { ticketNumber } = useParams();
  const {
    selectedTicket,
    replies,
    loading,
    error,
    getTicketByNumber,
    getRepliesByTicket,
    replyToTicket,
    clearSelected,
  } = useTicket();
  const { getMe, user } = useAuth();

  const [message, setMessage] = useState("");

  useEffect(() => {
    getMe();

    const fetch = async () => {
      if (!ticketNumber) return;
      const num = parseInt(ticketNumber as string);

      await getTicketByNumber(num);

      const updatedTicket = useTicketStore.getState().selectedTicket;

      if (updatedTicket?._id) {
        await getRepliesByTicket(updatedTicket._id);
      }
    };

    fetch();

    return () => clearSelected();
  }, [ticketNumber]);

  const handleReply = async () => {
    if (!message.trim() || !selectedTicket) return;

    await replyToTicket(selectedTicket._id, { message });

    setMessage("");
  };

  if (loading)
    return <div className="p-6 text-gray-500">در حال بارگذاری...</div>;

  if (error) return <div className="p-6 text-red-500">خطا: {error}</div>;

  if (!selectedTicket) return <div className="p-6">تیکتی یافت نشد.</div>;

  const statusMap = {
    open: "باز",
    in_progress: "درحال بررسی",
    closed: "بسته شده",
  } as const;

  const getStatusInfo = (status) => {};

  const statusLabel = statusMap[status as keyof typeof statusMap] ?? "نامشخص";

  return (
    <div className="load-page">
      <TicketHeader
        role={user?.role}
        title={<PersianNumber number={selectedTicket.number} />}
      />

      <div className="max-w-2xl load-page mt-4 bg-Jet_Black_4 rounded-[2.5rem] gradient-border mx-auto p-6 space-y-6">
        {/* تیکت اصلی */}
        <div className="p-5 rounded-3xl bg-Jet_Black">
          <h1 className="text-2xl font-bold">{selectedTicket.title}</h1>

          <div className="flex flex-wrap gap-2 mt-2 text-sm text-Ash_Gray">
            <div className="bg-Jet_Black_2 w-fit p-2 rounded-full">
              شماره تیکت: <PersianNumber number={selectedTicket.number} />
            </div>
            <div className="bg-Jet_Black_2 w-fit p-2 rounded-full">
              وضعیت: <span className="font-semibold">{statusLabel}</span>
            </div>
          </div>

          <p className="mt-4 whitespace-pre-line">{selectedTicket.message}</p>

          <div className="mt-4 gap-1 flex items-center text-sm text-Jet_Black_3">
            <UserIcon />
            <p>{selectedTicket.reporterId.fullName}</p>
          </div>

          <div className="mt-2 gap-1 flex items-center text-sm text-Jet_Black_3">
            <StartDateIcon />
            <p>
              ارسال‌شده در:{" "}
              <PersianDate createdAt={`${selectedTicket.createdAt}`} />
            </p>
          </div>

          <div className="mt-2 gap-1 flex items-center text-sm text-Jet_Black_3">
            <ClockOrgIcon />
            <p>
              ساعت:{" "}
              {new Date(selectedTicket.createdAt).toLocaleTimeString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>

        {/* لیست پاسخ‌ها */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">پاسخ‌ها</h2>

          {!Array.isArray(replies) || replies.length === 0 ? (
            <p className="text-gray-500">هیچ پاسخی ثبت نشده است.</p>
          ) : (
            replies.map((reply) => (
              <div
                key={reply._id}
                className="p-4 rounded-3xl bg-Jet_Black_2 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center justify-center gap-2 font-medium">
                    <span
                      className={`${
                        roleColors[reply.senderId.role] || "text-gray-700"
                      }`}
                    >
                      {reply.senderId.fullName}
                    </span>{" "}
                    <div className="w-1 h-1 mt-1 rounded-full bg-Slate_Blue" />
                    <span className="text-Slate_Blue">
                      {reply.senderId.role === "model" ? "مدل" : "مدیر"}
                    </span>
                  </span>
                  <span className="text-xs flex gap-2 text-Jet_Black_3">
                    {new Date(reply.createdAt).toLocaleTimeString("fa-IR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <div className="w-1 h-1 mt-[6px] mt rounded-full bg-Jet_Black_3" />
                    <PersianDate createdAt={reply.createdAt} />
                  </span>
                </div>
                <p className="whitespace-pre-line">{reply.message}</p>
              </div>
            ))
          )}
        </div>

        <Divider />

        {/* فرم پاسخ جدید */}
        {selectedTicket.status !== "closed" ? (
          <div className="mt-8 bg-Jet_Black_2 p-2 rounded-[2rem] items-end gap-4 flex">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full rounded-3xl p-2 outline-none bg-transparent"
              style={{ resize: "none" }}
              placeholder="متن پاسخ را وارد کنید..."
            />
            <Button
              isIconOnly
              radius="full"
              size="lg"
              onPress={handleReply}
              className="bg-Porcelain_White text-Jet_Black_2"
            >
              <ArrowUpIcon />
            </Button>
          </div>
        ) : (
          <div>این تیکت بسته شده است.</div>
        )}
      </div>
    </div>
  );
}
