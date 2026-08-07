import { axiosInstance } from "@/shared/lib/http/axios";
import {
  CreateProjectPayload,
  CreateProjectResponse,
} from "../../types/employer/add-project";

export async function createProject(
  payload: CreateProjectPayload,
): Promise<CreateProjectResponse> {
  const { data } = await axiosInstance.post<CreateProjectResponse>(
    "/projects/",
    payload,
  );

  return data;
}
