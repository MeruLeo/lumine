"use client";

import { useRouter } from "next/navigation";
import { CollaborationCta } from "./collaboration-cta";
import { useApplyToProject } from "../../../hooks/queries/use-apply-to-project";

interface ApplyToProjectButtonProps {
  projectId: number;
}

export function ApplyToProjectButton({ projectId }: ApplyToProjectButtonProps) {
  const router = useRouter();

  const { mutate, isPending } = useApplyToProject({
    onSuccess: (request) => {
      router.push(`/requests/${request.id}`);
    },
  });

  return (
    <CollaborationCta
      onClick={() => mutate({ project: projectId })}
      isLoading={isPending}
    />
  );
}
