import { Router } from "express";
import CategoryController from "../controller/CategoryController.js";

const router = new Router

router.get('/', CategoryController.index)
router.post('/', CategoryController.store)
router.delete('/:id',CategoryController.delete)

export default router