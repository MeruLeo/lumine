import mongoose, { model, Schema, Document, Types } from "mongoose";
import type { IProject } from "../../../../packages/types/dist/index";

export interface projectDocument extends IProject, Omit<Document, "model"> {
  _id: Types.ObjectId;
}

const projectSchema = new Schema<projectDocument>(
  {
    name: { type: String, required: true },
    model: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    budget: { type: Number, required: true },
    category: {
      type: String,
      enum: [
        "fashion",
        "sportswear_men",
        "sportswear_women",
        "formal_men",
        "formal_women",
        "casual",
        "editorial",
        "advertisement",
        "beauty",
        "product",
        "lifestyle",
        "lookbook",
        "streetwear",
        "underwear",
        "accessories",
        "runway",
        "campaign",
        "ecommerce",
        "others",
      ],
      default: null,
    },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
  }
);

export const ProjectModel = model<projectDocument>("Project", projectSchema);
