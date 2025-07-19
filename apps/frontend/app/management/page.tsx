"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/users.store";
import { UserType } from "@/types/users";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import { Loader2, PenIcon } from "lucide-react";
import { toast } from "sonner";
import PersianNumber from "@/utils/convertToPersianNumber";
import { useUser } from "@/hooks/useUser";
import { TrashIcon } from "@/components/icons/icons";
import DeleteUserModal from "@/components/management/DeleteUserModal";

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    getAllUsers,
    changeUserStatus,
    deleteUserById,
    verifyUser,
    clearError,
  } = useUser();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    getAllUsers();

    return () => {
      clearError();
    };
  }, [getAllUsers, clearError]);

  const handleVerify = async (id: string) => {
    setSelectedId(id);
    await verifyUser(id);
    setSelectedId(null);
    toast.success("کاربر تأیید شد");
  };

  const handleStatusChange = async (
    id: string,
    status: "pending" | "accepted" | "rejected",
  ) => {
    setSelectedId(id);
    await changeUserStatus(id, status);
    setSelectedId(null);
    toast.success("وضعیت بروزرسانی شد");
  };

  const handleDelete = (user: UserType) => {
    setSelectedUser(user);
    setDeleteModalOpen(true);
  };

  return (
    <div className="p-4">
      {loading && <p>در حال بارگذاری...</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <Table>
        <TableHeader>
          <TableColumn>نام کامل</TableColumn>
          <TableColumn>شماره</TableColumn>
          <TableColumn>ایمیل</TableColumn>
          <TableColumn>نقش</TableColumn>
          <TableColumn>وضعیت</TableColumn>
          <TableColumn>تایید شماره</TableColumn>
          <TableColumn>عملیات</TableColumn>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>
                <PersianNumber number={user.phone} />
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role === "model" ? "مدل" : "مدیر"}</TableCell>
              <TableCell>
                <Select
                  selectedKeys={[user.status]}
                  onChange={(e) =>
                    handleStatusChange(
                      user._id,
                      e.target.value as UserType["status"],
                    )
                  }
                  disabled={selectedId === user._id}
                >
                  <SelectItem key="pending">در انتظار</SelectItem>
                  <SelectItem key="accepted">پذیرفته شده</SelectItem>
                  <SelectItem key="rejected">رد شده</SelectItem>
                </Select>
              </TableCell>
              <TableCell>
                {user.verifyPhone ? "تایید شده" : "تایید نشده"}
              </TableCell>
              <TableCell className="flex gap-4">
                <Button
                  size="sm"
                  disabled={selectedId === user._id}
                  color="danger"
                  startContent={<TrashIcon />}
                  variant="faded"
                  isIconOnly
                  onPress={() => handleDelete(user)}
                />
                <Button
                  size="sm"
                  disabled={selectedId === user._id}
                  startContent={<PenIcon />}
                  variant="faded"
                  isIconOnly
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteUserModal
        isOpen={deleteModalOpen}
        onOpenChange={(open) => {
          setDeleteModalOpen(open);
          if (!open) setSelectedUser(null);
        }}
        selectedUser={selectedUser}
      />
    </div>
  );
}
