import express from 'express'

import ProductsRoutes from './app/routes/ProductsRoutes.js'

class App{
    constructor(){
        this.app = express()
        this.middleware()
        this.routes()
    }

    middleware(){

    }

    routes(){
        this.app.use('/', ProductsRoutes)
    }
}

export default new App().app