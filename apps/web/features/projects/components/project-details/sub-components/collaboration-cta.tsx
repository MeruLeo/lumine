import { Button } from "@heroui/react";
import { LocationArrowFill } from "@gravity-ui/icons";
import { BodyPortal } from "@/shared/components/body-portal";
import { BookamrkProject } from "./bookmark";
import { ShareProject } from "./share";

interface CollaborationCtaProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export const CollaborationCta = ({
  onClick,
  isLoading,
}: CollaborationCtaProps) => {
  return (
    <BodyPortal>
      <div className="fixed bottom-24 flex items-center gap-2 left-1/2 z-50 -translate-x-1/2 rounded-full  sm:bottom-4">
        <ShareProject />
        <div className="rounded-full p-2 backdrop-blur-3xl">
          <Button
            size="lg"
            className="font-bold"
            onClick={onClick}
            isPending={isLoading}
          >
            {!isLoading && <LocationArrowFill />}
            ارسال درخواست همکاری
          </Button>
        </div>
        <BookamrkProject />
      </div>
    </BodyPortal>
  );
};
