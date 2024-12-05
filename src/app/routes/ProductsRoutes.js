import { Router } from 'express';

const router = new Router()

router.get('/',(req,res)=>{
    res.send("olá mundo")
})

export default router