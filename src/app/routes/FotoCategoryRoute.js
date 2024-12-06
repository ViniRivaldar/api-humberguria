import { Router } from "express";
import FotoCategoryController from '../controller/FotoCategoryController.js'

const router = new Router()

router.get('/', FotoCategoryController.index)

export default router