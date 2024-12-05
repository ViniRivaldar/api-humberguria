import express from 'express'

import ProductsRoutes from './app/routes/ProductsRoutes.js'

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
        this.app.use('/', ProductsRoutes)
    }
}

export default new App().app