import { axiosInstance } from "@/shared/lib/http/axios";
import { GetMeResponse } from "../types/me";

export async function getMe(): Promise<GetMeResponse> {
  const { data } = await axiosInstance.get("/profile/me/");
  return data;
}
