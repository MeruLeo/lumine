import { mutationOptions } from "@tanstack/react-query";
import { markNotificationRecipientAsSeen } from "../api/notifications";

export const markNotificationRecipientSeenMutationOptions = () =>
  mutationOptions({
    mutationFn: markNotificationRecipientAsSeen,
  });
