import { Router } from 'express';
import ProductController from '../controller/ProductController.js'

const router = new Router()

router.get('/',ProductController.index)
router.post('/',ProductController.store)
router.get('/:id',ProductController.show)
router.put('/:id',ProductController.update)
router.delete('/:id', ProductController.delete)


export default router