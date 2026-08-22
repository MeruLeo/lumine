import { UserStatus } from "@/features/auth/types/auth_1";
import { BasicInfoPayload } from "@/features/auth/types/auth_2";
import type { Category, UserRole } from "@/features/auth/types/auth_3";
import { ModelWorkPayload } from "@/features/auth/types/auth_4";
import { PortfolioResponse } from "@/features/auth/types/auth_5";

export type BasicNationality = BasicInfoPayload["nationality"];
export type BasicGender = BasicInfoPayload["gender"];

export interface UserGroup {
  id: number;
  name: UserRole;
}

export type UserCategory = Pick<
  Category,
  "id" | "name" | "persion_name" | "type"
> & {
  primary: boolean;
};

export type UserPortfolio = PortfolioResponse["data"] & {
  id: number;
  created: string;
  updated: string;
  user: number;
};

export type UserTechnicalInfo = Omit<
  ModelWorkPayload,
  "full_body_url" | "full_shot_url"
> & {
  id: number;
};

export interface GetMeResponse {
  id: number;

  groups: UserGroup[];

  categories: UserCategory[];

  images_portfolio: UserPortfolio | null;

  technical_info: UserTechnicalInfo | null;

  employer_profile: string | null;

  instructor_profile: string | null;

  phone_number: string;

  first_name: string;

  last_name: string;

  national_code: string;

  nationality: BasicNationality;

  birth_date: BasicInfoPayload["birth_date"];

  gender: BasicGender;

  status: UserStatus;

  work_status: string | null;

  step_reg: number;

  date_joined: string;
}
