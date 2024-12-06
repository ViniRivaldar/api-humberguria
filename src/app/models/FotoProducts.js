import Sequelize, {Model} from 'sequelize'

class FotoProducts extends Model{
    static init(Sequelize){
        super.init({
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
                  return this.getDataValue('filename');
                }
            }
        },{sequelize})
    }

    static associate(models){
        this.belongsTo(models.Proucts, {foreignKey: 'products_id'})
    }
}