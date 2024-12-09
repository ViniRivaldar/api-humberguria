import express from 'express'
import cors from 'cors'

import ProductsRoutes from './app/routes/ProductsRoutes.js'
import CategoryRoutes from './app/routes/CategoryRoutes.js'
import FotoProductRoutes from './app/routes/FotoProductRoute.js'
import FotoCategoryRoutes from './app/routes/FotoCategoryRoute.js'

import './database/index.js';


class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(cors())
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/products', ProductsRoutes)
        this.app.use('/category', CategoryRoutes)
        this.app.use('/foto_product', FotoProductRoutes)
        this.app.use('/fotocategory', FotoCategoryRoutes)
    }
}

export default new App().app