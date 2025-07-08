export interface UserType {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  age?: number;
  role: "model" | "admin" | "developer";
  height?: number;
  weight?: number;
  naturalStat?: string;
  verify?: boolean;
  createdAt?: string;
}
