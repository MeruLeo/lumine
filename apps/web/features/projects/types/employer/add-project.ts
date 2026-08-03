export interface CreateProjectPayload {
  province_id: number;
  name: string;
  description: string;
  budget: number;
  category_id: number;
  start_date: string;
  end_date: string;
}

export interface CreateProjectResponseData {
  id: number;
  category: {
    id: number;
    name: string;
    persion_name: string;
    type: string;
  };
  employer: {
    id: number;
    first_name: string;
    last_name: string;
  };
  model: {
    id: number;
    first_name: string;
    last_name: string;
  } | null;
  province: {
    id: number;
    name: string;
    slug: string;
  };
  name: string;
  description: string;
  budget: number;
  start_date: string;
  end_date: string;
  moderation_status: "pending" | "approved" | "rejected";
  status:
    | "draft"
    | "open"
    | "in_progress"
    | "completed"
    | "closed"
    | "cancelled";
  expires_at: string | null;
  created: string;
  updated: string;
}

export interface CreateProjectResponse {
  success: boolean;
  message: string;
  data: CreateProjectResponseData;
}
