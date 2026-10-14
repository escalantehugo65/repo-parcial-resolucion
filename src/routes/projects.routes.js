import { Router } from "express";
import { createProject, deleteProject, getAllProjects, getMyProjects, updateProject } from "../controllers/projects.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { leaderMiddleware } from "../middlewares/leader.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { createProjectValidation, updateProjectValidation } from "../middlewares/validations/project.validation.js";

export const projectRoutes = Router();
projectRoutes.post("/projects", authMiddleware, createProjectValidation, validator, createProject);
projectRoutes.get("/projects", authMiddleware, adminMiddleware, getAllProjects);
projectRoutes.get("/projects/my-projects", authMiddleware, getMyProjects);
projectRoutes.put("/projects/:id", authMiddleware, leaderMiddleware, updateProjectValidation, validator, updateProject);
projectRoutes.delete("/projects/:id", authMiddleware, leaderMiddleware, deleteProject);
