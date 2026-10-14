import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validator } from "../middlewares/validator.middleware.js";
import { registerValidation, loginValidation } from "../middlewares/validations/auth.validation.js";

export const authRoutes = Router();
authRoutes.post("/auth/register", registerValidation, validator, register);
authRoutes.post("/auth/login", loginValidation, validator, login);
authRoutes.post("/auth/logout", authMiddleware, logout);
