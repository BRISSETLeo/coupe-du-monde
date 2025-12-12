import { Router } from "express";
import teamsRoute from "./teamsRoute";
import matchsRoute from "./matchsRoute";
import { generateTestToken } from "../controllers/authController";

const router = Router();

// Route de test pour générer des tokens (À SUPPRIMER EN PRODUCTION !)
router.post("/auth/generate-token", generateTestToken);

router.use("/matchs", matchsRoute);
router.use("/teams", teamsRoute);

export default router;