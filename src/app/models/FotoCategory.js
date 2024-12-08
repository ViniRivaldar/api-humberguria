import Sequelize, {Model} from 'sequelize'

class FotoCategory extends Model{
    static init(sequelize){
        super.init({
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
            },
            originalmente:{
                type:Sequelize.STRING,
                defaultValue: '',
                validate:{
                    notEmpty:{
                        msg: 'o campo não ser vazio'
                    }
                }
            },
            filename:{
                type:Sequelize.STRING,
                defaultValue: '',
                validate:{
                  notEmpty:{
                    msg: 'o campo não ser vazio'
                  }
                }
            },
            url:{
                type:Sequelize.VIRTUAL,
                get(){
                   const filename = this.getDataValue('filename');
                return `https://res.cloudinary.com/dij2lqiy7/image/upload/v1733686091/${filename}`
                }
            }
        },{sequelize,
            modelName:'FotoCategory',
            tableName:'foto_category', 
            timestamps: true,
            underscored: true 
        })
    }

    static associate(models){
        this.belongsTo(models.Category, {foreignKey: 'category_id'})
    }
}
export default FotoCategory;