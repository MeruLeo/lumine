import { Request, Response } from "express";
import { ProjectModel } from "../../models/project";
import { errorResponse, successResponse } from "../../utils/responses";
import mongoose from "mongoose";
import { UserModel } from "../../models/user";

export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await ProjectModel.find()
      .populate("model", "fullName modelingCode")
      .lean();
    successResponse(res, 200, {
      message: "All projects fetched successfully",
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching all projects", err);
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const newProject = new ProjectModel(req.body);
    await newProject.save();

    const populatedProject = await ProjectModel.findById(newProject._id)
      .populate("model", "fullName modelingCode")
      .lean();

    successResponse(res, 201, {
      message: "Project created successfully",
      project: populatedProject,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while creating new project", err);
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      errorResponse(res, 400, "Invalid project ID format", projectId);
      return;
    }

    const project = await ProjectModel.findById(projectId)
      .populate("model", "fullName modelingCode")
      .lean();

    if (!project) {
      errorResponse(res, 404, "Project not found", projectId);
      return;
    }

    successResponse(res, 200, {
      message: "Project fetched successfully",
      project,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching project", err);
  }
};

const allowedFieldsToUpdate = new Set([
  "name",
  "status",
  "startDate",
  "endDate",
  "budget",
  "category",
  "description",
  "model",
]);

const allowedStatuses = new Set([
  "pending",
  "in_progress",
  "completed",
  "cancelled",
]);

const allowedCategories = new Set(["fashion", "advertisement", "editorial"]);

export const updateProjectById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { projectId } = req.params;

    // Validate projectId format
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      errorResponse(res, 400, "Invalid project ID format", projectId);
    }

    const updates = req.body;

    // Filter keys to only allowed fields
    const updateKeys = Object.keys(updates).filter((key) =>
      allowedFieldsToUpdate.has(key)
    );

    if (updateKeys.length === 0) {
      errorResponse(
        res,
        400,
        "No valid fields provided for update",
        Array.from(allowedFieldsToUpdate)
      );
    }

    const updateData: Record<string, any> = {};

    // Validate each field
    for (const key of updateKeys) {
      const value = updates[key];

      // Check empty strings for string fields
      if (typeof value === "string" && value.trim() === "") {
        errorResponse(res, 400, `Field "${key}" cannot be empty`, value);
      }

      switch (key) {
        case "status":
          if (!allowedStatuses.has(value)) {
            errorResponse(res, 400, `Invalid status value`, value);
          }
          updateData.status = value;
          break;

        case "category":
          if (value !== null && !allowedCategories.has(value)) {
            errorResponse(res, 400, `Invalid category value`, value);
          }
          updateData.category = value;
          break;

        case "model":
          // Check if value is a valid ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            errorResponse(res, 400, "Invalid model user ID format", value);
          }
          // Verify the user exists
          const userExists = await UserModel.exists({ _id: value });
          if (!userExists) {
            errorResponse(res, 400, "Model user not found", value);
          }
          updateData.model = value;
          break;

        case "startDate":
        case "endDate":
          // Optional: Validate date format
          const date = new Date(value);
          if (isNaN(date.getTime())) {
            errorResponse(res, 400, `Invalid date format for ${key}`, value);
          }
          updateData[key] = date;
          break;

        case "budget":
          if (typeof value !== "number" || value <= 0) {
            errorResponse(res, 400, "Budget must be a positive number", value);
          }
          updateData.budget = value;
          break;

        default:
          // For name, description and other strings without special validation
          updateData[key] = value;
          break;
      }
    }

    // Perform the update and return the updated project with populated model data
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      projectId,
      updateData,
      { new: true }
    )
      .populate("model", "fullName modelingCode")
      .lean();

    if (!updatedProject) {
      errorResponse(res, 404, "Project not found", projectId);
    }

    successResponse(res, 200, {
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (err) {
    console.error(err);
    errorResponse(res, 500, "Error while updating project", err);
  }
};

export const deleteProjectById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      errorResponse(res, 400, "Invalid project ID format", projectId);
      return;
    }

    const project = await ProjectModel.findByIdAndDelete(projectId);

    if (!project) {
      errorResponse(res, 404, "Project not found", projectId);
      return;
    }

    successResponse(res, 200, {
      message: "Project deleted successfully",
      projectId,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while deleting project", err);
  }
};

export const getProjectsByModel = async (req: Request, res: Response) => {
  try {
    const { modelId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(modelId)) {
      errorResponse(res, 400, "Invalid model ID format", modelId);
      return;
    }

    const projects = await ProjectModel.find({ model: modelId })
      .populate("model", "fullName modelingCode")
      .lean();

    successResponse(res, 200, {
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects for model", err);
  }
};

export const getProjectsByStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.params;
    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      errorResponse(res, 400, "Invalid status", validStatuses);
      return;
    }

    const projects = await ProjectModel.find({ status })
      .populate("model", "fullName modelingCode")
      .lean();

    successResponse(res, 200, {
      message: `Projects with status ${status} fetched successfully`,
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by status", err);
  }
};

export const getProjectsByStatusWithModelingCode = async (
  req: Request,
  res: Response
) => {
  try {
    const { status } = req.params;
    const validStatuses = ["pending", "in_progress", "completed", "cancelled"];

    if (!validStatuses.includes(status)) {
      errorResponse(res, 400, "Invalid status", validStatuses);
      return;
    }

    const modelingCode = req.user?.modelingCode;

    if (!modelingCode) {
      errorResponse(res, 401, "Modeling code not found in user token");
      return;
    }

    const projects = await ProjectModel.find({ status })
      .populate({
        path: "model",
        match: { modelingCode },
        select: "fullName modelingCode",
      })
      .lean();

    const filteredProjects = projects.filter((p) => p.model);

    successResponse(res, 200, {
      message: `Projects with status "${status}" and modelingCode "${modelingCode}" fetched successfully`,
      projects: filteredProjects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by status", err);
  }
};

export const getProjectsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.params;
    const validCategories = ["fashion", "advertisement", "editorial"];

    if (!validCategories.includes(category)) {
      errorResponse(res, 400, "Invalid category", validCategories);
      return;
    }

    const projects = await ProjectModel.find({ category })
      .populate("model", "fullName modelingCode")
      .lean();

    successResponse(res, 200, {
      message: `Projects in category ${category} fetched successfully`,
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by category", err);
  }
};

export const getProjectByName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;

    const projects = await ProjectModel.find({
      name: { $regex: name, $options: "i" }, // i = insensitive
    });

    successResponse(res, 200, {
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by name", err);
  }
};

export const getProjectByModelId = async (req: Request, res: Response) => {
  try {
    const modelId = req?.user?._id;
    if (!modelId) {
      errorResponse(res, 401, "Unauthorized", null);
      return;
    }
    const projects = await ProjectModel.find({ model: modelId })
      .populate("model", "fullName modelingCode")
      .lean();
    successResponse(res, 200, {
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by model ID", err);
  }
};
export const getProjectByModelingCode = async (req: Request, res: Response) => {
  try {
    const modelCode = req?.user?.modelingCode;
    if (!modelCode) {
      errorResponse(res, 401, "Unauthorized", null);
      return;
    }
    const model = await UserModel.findOne({ modelingCode: modelCode });

    const projects = await ProjectModel.find({ model: model?._id.toString() })
      .populate("model", "fullName modelingCode")
      .lean();
    successResponse(res, 200, {
      message: "Projects fetched successfully",
      projects,
    });
  } catch (err) {
    errorResponse(res, 500, "Error while fetching projects by model ID", err);
  }
};
