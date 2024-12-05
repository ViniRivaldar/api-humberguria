import Sequelize, {Model} from 'sequelize'

class Products extends Model{
    static init(sequelize){
        super.init({
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
        },{sequelize})
        return this
    }
}
export default Products