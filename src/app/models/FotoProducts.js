import Sequelize, { Model } from 'sequelize';

class FotoProducts extends Model {
    static init(sequelize) {
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            originalmente: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'o campo não pode ser vazio'
                    }
                }
            },
            filename: {
                type: Sequelize.STRING,
                defaultValue: '',
                validate: {
                    notEmpty: {
                        msg: 'o campo não pode ser vazio'
                    }
                }
            },
            products_id: {
                type: Sequelize.UUID,
                allowNull: true  
            },
            url: {
                type: Sequelize.VIRTUAL,
                get() {
                    const filename = this.getDataValue('filename');
                    console.log('Filename:', filename);
                    return `https://res.cloudinary.com/dij2lqiy7/image/upload/v1733686091/${filename}`
                }
            }
        }, {
            sequelize,
            modelName: 'FotoProducts',
            tableName: 'foto_products', 
            timestamps: true,
            underscored: true 
        });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Products, { 
            foreignKey: 'products_id',
            as: 'product'
        });
    }
}

export default FotoProducts;