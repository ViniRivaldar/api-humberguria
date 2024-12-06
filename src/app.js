import express from 'express'

import ProductsRoutes from './app/routes/ProductsRoutes.js'
import CategoryRoutes from './app/routes/CategoryRoutes.js'

import './database/index.js';


class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/products', ProductsRoutes)
        this.app.use('/category', CategoryRoutes)
    }
}

export default new App().app