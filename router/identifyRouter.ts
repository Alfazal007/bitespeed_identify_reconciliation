import { Router } from "express";
import { identifyHandler } from "../controller/identifyHandler";

export const router = Router()

router.route("/identify").post(identifyHandler)
