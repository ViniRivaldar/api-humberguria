import { Router } from "express";
import FotoProductController from "../controller/FotoProductController.js";
import upload from "../../config/MulterConfig.js";

const router = new Router();


router.post("/", upload.single("file"), FotoProductController.store);

export default router;