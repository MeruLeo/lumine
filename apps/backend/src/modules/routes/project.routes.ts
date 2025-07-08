import { Router } from "express";
import {
  createProject,
  deleteProjectById,
  getAllProjects,
  getProjectById,
  updateProjectById,
  getProjectsByModel,
  getProjectsByStatus,
  getProjectsByCategory,
  getProjectByName,
  getProjectByModelId,
  getProjectByModelingCode,
  getProjectsByStatusWithModelingCode,
} from "../controllers/project.controller";
import { verifyDeveloperOrAdmin } from "../../middlewares/user.isAdmin";
import { authenticate } from "../../middlewares/auth.middleware";

const router = Router();

router.get("/model", authenticate, getProjectByModelId);
router.get("/model-code", authenticate, getProjectByModelingCode);

// Base routes
router
  .route("/")
  .get(authenticate, verifyDeveloperOrAdmin, getAllProjects)
  .post(authenticate, verifyDeveloperOrAdmin, createProject);

// Project by ID routes
router
  .route("/:projectId")
  .get(authenticate, getProjectById)
  .put(authenticate, verifyDeveloperOrAdmin, updateProjectById)
  .delete(authenticate, verifyDeveloperOrAdmin, deleteProjectById);

// Filter routes
router.get(
  "/model/:modelId",
  authenticate,
  verifyDeveloperOrAdmin,
  getProjectsByModel
);
router.get(
  "/status/:status",
  authenticate,
  verifyDeveloperOrAdmin,
  getProjectsByStatus
);
router.get(
  "/status/model-code/:status",
  authenticate,
  getProjectsByStatusWithModelingCode
);
router.get(
  "/category/:category",
  authenticate,
  verifyDeveloperOrAdmin,
  getProjectsByCategory
);
router.get(
  "/name/:name",
  authenticate,
  verifyDeveloperOrAdmin,
  getProjectByName
);

export default router;
