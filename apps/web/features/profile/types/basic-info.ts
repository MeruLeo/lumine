import type { GetMeResponse } from "./me";

export type BasicInfo = Pick<
  GetMeResponse,
  | "phone_number"
  | "first_name"
  | "last_name"
  | "national_code"
  | "nationality"
  | "gender"
  | "birth_date"
  | "status"
  | "work_status"
  | "step_reg"
>;
