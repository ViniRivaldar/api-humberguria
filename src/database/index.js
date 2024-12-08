import Sequelize from 'sequelize';

import configDatabase from '../config/database.js'
import Products from '../app/models/Products.js';
import Category from '../app/models/Category.js';
import FotoProducts from '../app/models/FotoProducts.js';
import FotoCategory from '../app/models/FotoCategory.js';

const models = [Products, Category, FotoProducts,FotoCategory];

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