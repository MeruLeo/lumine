import { Button } from "@heroui/react";
import {
  ArrowUpFromSquare,
  Bookmark,
  LocationArrowFill,
} from "@gravity-ui/icons";
import { BodyPortal } from "@/shared/components/body-portal";

interface ShareProps {
  onClick?: () => void;
  isLoading?: boolean;
}

export const ShareProject = ({ onClick, isLoading }: ShareProps) => {
  return (
    <Button
      size="lg"
      className="border border-border backdrop-blur-3xl bg-transparent  "
      onClick={onClick}
      isPending={isLoading}
      isIconOnly
    >
      {!isLoading && <ArrowUpFromSquare />}
    </Button>
  );
};
