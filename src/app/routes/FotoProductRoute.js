import { Router } from "express";
import FotoProductController from '../controller/FotoProductController.js'

const router = new Router()

router.get('/', FotoProductController.index)

export default router