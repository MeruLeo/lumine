import type { Project } from "../../../types/project";

type UserLike = Project["employer"];

interface PersonChipProps {
  user: UserLike;
}

export const PersonChip = ({ user }: PersonChipProps) => {
  return (
    <span className="flex items-center gap-2" data-testid="person-chip">
      <MiniAvatar user={user} />
      <span className="text-sm">{user.fullName}</span>
    </span>
  );
};

const MiniAvatar = ({ user }: { user: UserLike }) => {
  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt={user.fullName}
        className="h-5 w-5 rounded-full object-cover"
        loading="lazy"
      />
    );
  }

  const initialLetter = user.fullName ? user.fullName.charAt(0) : "?";

  return (
    <span
      className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
      aria-hidden="true"
    >
      {initialLetter}
    </span>
  );
};
