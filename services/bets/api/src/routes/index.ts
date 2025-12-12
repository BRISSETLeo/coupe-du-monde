import { Router } from "express";
import { generateTestToken } from "../controllers/authController";
import betsRoute from "./betsRoute";

const router = Router();

// Route de test pour générer des tokens (À SUPPRIMER EN PRODUCTION !)
router.post("/auth/generate-token", generateTestToken);

router.use("/bets", betsRoute);

export default router;