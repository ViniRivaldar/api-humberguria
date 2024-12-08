import * as yup from 'yup'

import Category from '../models/Category.js'
import FotoCategory from '../models/FotoCategory.js';

class CategoryController{
    async index(req,res){
        try {
            const categories = await Category.findAll({
                attributes: ['id', 'name'],
                include:[{
                    model: FotoCategory,
                    as:'foto_category',
                    attributes:['id','url','filename']
                }]
            });
            return res.json(categories);
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Erro ao listar categorias' });
        }
    }
    async store(req,res){
        try {
            const schema = yup.object().shape({
                name: yup.string().required('Nome é obrigatório')
            });

            await schema.validate(req.body);

            const category = await Category.create(req.body);
            return res.status(201).json(category);
        } catch (error) {
            if (error instanceof yup.ValidationError) {
                return res.status(400).json({ error: error.errors });
                
            }
            console.log(error)
            return res.status(500).json({ error: 'Erro ao criar categoria' });
        }
    }
    async delete(req,res){
        try {
            const { id } = req.params;

            const category = await Category.findByPk(id);
            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            await category.destroy();
            return res.status(204).json('deletado');
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao deletar categoria' });
        }
    }
}

export default new CategoryController