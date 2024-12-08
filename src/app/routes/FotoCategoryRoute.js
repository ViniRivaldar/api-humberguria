import { Router } from "express";
import FotoCategoryController from '../controller/FotoCategoryController.js'
import upload from "../../config/MulterConfig.js";

const router = new Router()

router.post('/', upload.single("file"), FotoCategoryController.store)

export default router