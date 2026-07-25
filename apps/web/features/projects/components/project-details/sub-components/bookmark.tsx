import { Button } from "@heroui/react";
import { Bookmark, LocationArrowFill } from "@gravity-ui/icons";
import { BodyPortal } from "@/shared/components/body-portal";

interface BookmarkProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export const BookamrkProject = ({ onClick, isLoading }: BookmarkProps) => {
  return (
    <Button
      size="lg"
      className="border border-border backdrop-blur-3xl bg-transparent  "
      onClick={onClick}
      isPending={isLoading}
      isIconOnly
    >
      {!isLoading && <Bookmark />}
    </Button>
  );
};
