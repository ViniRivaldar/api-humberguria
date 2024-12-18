import Sequelize, {Model} from 'sequelize'

class Products extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            name:{
                type:Sequelize.STRING,
                defaultValue: ''
            },
            price:{
                type:Sequelize.INTEGER,
            },
            description: {
                type:Sequelize.STRING,
                defaultValue: ''
            },
            offer:{
                type:Sequelize.BOOLEAN,
                defaultValue: false
            }
        },{sequelize,timestamps: true})
        return this
    }
    static associate(models) {
        this.belongsTo(models.Category, { 
            foreignKey: 'category_id', 
            as: 'category' 
        });

        this.hasMany(models.FotoProducts, {
            foreignKey: 'products_id',
            as: 'foto_products', 
        });
    }
    
}
export default Products