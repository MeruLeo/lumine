import { create } from "zustand";

import { IUser } from "../../../packages/types/dist";

export type PersonalInfo = Pick<
  IUser,
  | "fullName"
  | "phone"
  | "email"
  | "gender"
  | "married"
  | "nationalCode"
  | "age"
  | "national"
>;

export type TechnicalInfo = Pick<
  IUser,
  "height" | "weight" | "naturalStat" | "level" | "password"
>;

interface RegisterState {
  personalInfo: Partial<PersonalInfo>;
  technicalInfo: Partial<TechnicalInfo>;
  setPersonalInfo: (data: Partial<PersonalInfo>) => void;
  setTechnicalInfo: (data: Partial<TechnicalInfo>) => void;
  reset: () => void;
}

export const useRegisterStore = create<RegisterState>((set) => ({
  personalInfo: {},
  technicalInfo: {},
  setPersonalInfo: (data) => set({ personalInfo: data }),
  setTechnicalInfo: (data) => set({ technicalInfo: data }),
  reset: () => set({ personalInfo: {}, technicalInfo: {} }),
}));
