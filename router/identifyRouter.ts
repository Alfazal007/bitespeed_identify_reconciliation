import { Router } from "express";
import { identifyController } from "../controller/identifyController";

export const router = Router()

router.route("/identify").post(identifyController)
