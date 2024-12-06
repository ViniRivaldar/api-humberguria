import Sequelize, { Model } from 'sequelize'

class Category extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: true,
                defaultValue: ''
            },
        }, {
            sequelize,
            modelName: 'Category' 
        })
        return this
    }
}

export default Category