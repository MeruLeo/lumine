import { useRegisterStore } from "@/stores/register.store";

export const useRegister = () => {
  const {
    personalInfo,
    technicalInfo,
    reset,
    setPersonalInfo,
    setTechnicalInfo,
  } = useRegisterStore();

  return {
    personalInfo,
    technicalInfo,
    reset,
    setPersonalInfo,
    setTechnicalInfo,
  };
};
