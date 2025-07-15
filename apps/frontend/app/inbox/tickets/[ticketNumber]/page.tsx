"use client";

import { useEffect, useState } from "react";
import { useTicketStore } from "@/stores/ticket.store";
import { useParams } from "next/navigation";
import PersianDate from "@/components/persianDate";
import { Button, Divider, Input, Textarea } from "@heroui/react";
import { ArrowUpIcon, CalendarIcon } from "@heroicons/react/20/solid";
import { TicketHeader } from "@/components/inbox/tickets/ticket/ticketHeader";
import PersianNumber from "@/utils/convertToPersianNumber";
import {
  ArrowLeftIcon,
  CheckIcon,
  StartDateIcon,
} from "@/components/icons/icons";
// import { toast } from "react-hot-toast";

const roleColors: Record<string, string> = {
  admin: "text-red-600",
  model: "text-green-600",
  developer: "text-blue-600",
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
  } = useTicketStore();

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetch = async () => {
      if (ticketNumber) {
        const num = parseInt(ticketNumber as string);

        await getTicketByNumber(num);

        const ticketId = useTicketStore.getState().selectedTicket?._id;

        if (ticketId) await getRepliesByTicket(ticketId);
      }
    };

    fetch();

    return () => clearSelected();
  }, [ticketNumber]);

  const handleReply = async () => {
    if (!message.trim()) {
      console.error("پیام نمی‌تواند خالی باشد.");

      return;
    }

    if (!selectedTicket) return;

    await replyToTicket(selectedTicket._id, { message });
    setMessage("");

    console.log("پاسخ با موفقیت ارسال شد.");
  };

  if (loading)
    return <div className="p-6 text-gray-500">در حال بارگذاری...</div>;

  if (error) return <div className="p-6 text-red-500">خطا: {error}</div>;

  if (!selectedTicket) return <div className="p-6">تیکتی یافت نشد.</div>;

  return (
    <div className="load-page">
      <TicketHeader title={<PersianNumber number={selectedTicket.number} />} />

      <div className="max-w-2xl load-page mt-4 bg-Jet_Black_4 rounded-[2.5rem] gradient-border mx-auto p-6 space-y-6">
        {/* تیکت اصلی */}
        <div className="p-5 rounded-3xl bg-Jet_Black">
          <h1 className="text-2xl font-bold">{selectedTicket.title}</h1>
          <p className="text-sm flex gap-2">
            <div className="bg-Jet_Black_2 w-fit p-2 rounded-full text-Ash_Gray mt-1">
              شماره تیکت: <PersianNumber number={selectedTicket.number} />
            </div>

            <div className="bg-Jet_Black_2 w-fit p-2 rounded-full text-Ash_Gray mt-1">
              وضعیت:{" "}
              <span className="font-semibold">{selectedTicket.status}</span>
            </div>
          </p>
          <p className="mt-4 whitespace-pre-line">{selectedTicket.message}</p>

          <div className="mt-4 gap-1 flex items-center text-sm text-Jet_Black_3">
            <StartDateIcon />
            <p>
              ارسال‌شده در:{" "}
              <PersianDate createdAt={`${selectedTicket.createdAt}`} />
              {/* {new Date(selectedTicket.createdAt).toLocaleString("fa-IR")} */}
            </p>
          </div>
        </div>

        {/* لیست پاسخ‌ها */}
        {/* <div className="space-y-4">
        <h2 className="text-xl font-semibold">پاسخ‌ها</h2>

        {replies.length === 0 ? (
          <p className="text-gray-500">هیچ پاسخی ثبت نشده است.</p>
        ) : (
          replies.map((reply) => (
            <div
              key={reply._id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">
                  <span
                    className={`${
                      roleColors[reply.senderId.role] || "text-gray-700"
                    }`}
                  >
                    {reply.senderId.fullName}
                  </span>{" "}
                  ({reply.senderId.role})
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(reply.createdAt).toLocaleString("fa-IR")}
                </span>
              </div>
              <p className="text-gray-700 whitespace-pre-line">
                {reply.message}
              </p>
            </div>
          ))
        )}
      </div> */}

        {/* فرم پاسخ جدید */}
        <div className="mt-8 items-center gap-4 flex">
          {/* <h3 className="text-lg font-semibold mb-2">ارسال پاسخ جدید</h3>  */}
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            radius="full"
            variant="faded"
            className=""
            placeholder="متن پاسخ را وارد کنید..."
          />
          <Button
            isIconOnly
            radius="full"
            size="lg"
            onPress={handleReply}
            className=" bg-blue-600 text-white size-12 hover:bg-blue-700 transition"
          >
            <ArrowLeftIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
