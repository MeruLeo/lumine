export interface IUser {
  fullName: string;
  role: "admin" | "model" | "developer";
  age: number;
  password: string;
  modelingCode?: string;
  gender: "M" | "F";
  national: "P" | "N";
  nationalCode: string;
  verifyPhone: boolean;
  married: "S" | "M";
  naturalStat: "N" | "A";
  status: "pending" | "accepted" | "rejected";
  CosmeticSurgeryExplain: string;
  level: "B" | "I" | "P";
  height: number;
  weight: number;
  phone: string;
  email: string;
  refreshToken: string;
  createdAt?: Date;
  updatedAt?: Date;
}
