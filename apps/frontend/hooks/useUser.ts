import { useUserStore } from "@/stores/users.store";

export const useUser = () => {
  const {
    error,
    loading,
    me,
    users,
    selectedUser,
    clearError,
    clearSelectedUser,
    createUser,
    deleteUserById,
    getAllUsers,
    getMe,
    getUserById,
    updateUserById,
    verifyUser,
  } = useUserStore();

  return {
    error,
    loading,
    me,
    users,
    selectedUser,
    clearError,
    clearSelectedUser,
    createUser,
    deleteUserById,
    getAllUsers,
    getMe,
    getUserById,
    updateUserById,
    verifyUser,
  };
};
