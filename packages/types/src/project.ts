import { Types } from "mongoose";

export interface IProject {
  name: string;
  model: Types.ObjectId;
  status: "pending" | "in_progress" | "completed" | "cancelled";
  startDate: Date;
  endDate: Date;
  budget: number;
  category:
    | "fashion"
    | "sportswear_men"
    | "sportswear_women"
    | "formal_men"
    | "formal_women"
    | "casual"
    | "editorial"
    | "advertisement"
    | "beauty"
    | "product"
    | "lifestyle"
    | "lookbook"
    | "streetwear"
    | "underwear"
    | "accessories"
    | "runway"
    | "campaign"
    | "ecommerce"
    | "others";
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
