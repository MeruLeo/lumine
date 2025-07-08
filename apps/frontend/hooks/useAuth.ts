import { useAuthStore } from "@/stores/user.store";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
    refreshToken,
    getMe,
    sendEmailVerificationCode,
    verifyEmailCode,
    forgetPassword,
    verifyPasswordCode,
    resetPassword,
  } = useAuthStore();

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    getMe,
    register,
    logout,
    checkAuth,
    refreshToken,
    sendEmailVerificationCode,
    verifyEmailCode,
    forgetPassword,
    verifyPasswordCode,
    resetPassword,
  };
};
