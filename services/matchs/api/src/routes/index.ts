import {Router} from "express";
import teamsRoute from "./teamsRoute";
import matchsRoute from "./matchsRoute";

const router = Router();

router.use("/matchs", matchsRoute);
router.use("/teams", teamsRoute);

export default router;