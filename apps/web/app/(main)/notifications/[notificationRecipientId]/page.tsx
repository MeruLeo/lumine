import { NotificationDetails } from "@/features/notifications/components/notification-details";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "جزئیات اعلان",
};

interface NotificationDetailsPageProps {
  params: Promise<{
    notificationRecipientId: string;
  }>;
}

export default async function NotificationDetailsPage({
  params,
}: NotificationDetailsPageProps) {
  const { notificationRecipientId } = await params;

  return (
    <section className="flex flex-col gap-4 p-4 sm:p-6 lg:p-10">
      <NotificationDetails
        notificationRecipientId={Number(notificationRecipientId)}
      />
    </section>
  );
}
