import Sequelize from 'sequelize';

import configDatabase from '../config/database.js'
import Products from '../app/models/Products.js';
import Category from '../app/models/Category.js';
import FotoProducts from '../app/models/FotoProducts.js';

const models = [Products, Category, FotoProducts];

class Database {
    constructor() {
        this.init();
    }
    
    init() {
        this.connection = new Sequelize(configDatabase);
        
        
        models.forEach(model => model.init(this.connection));
        
        
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();