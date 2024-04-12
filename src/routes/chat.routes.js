import { Router } from "express";
import { processQuestion } from "../controllers/chat.controller.js";

const router=Router();

router.route("/conversation").post(processQuestion);

export default router