import { Router } from 'express';
import ProductController from '../controller/ProductController.js'

const router = new Router()

router.get('/',ProductController.index)

export default router