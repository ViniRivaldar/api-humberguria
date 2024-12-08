import * as yup from 'yup';
import Product from '../models/Products.js';
import Category from '../models/Category.js'; 
import FotoProducts from '../models/FotoProducts.js';

class ProductController {
    async store(req, res) {
        const productSchema = yup.object().shape({
            name: yup.string().required('Nome do produto é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
            price: yup.number().required('Preço é obrigatório').positive('Preço deve ser positivo'),
            description: yup.string().optional().max(255, 'Descrição muito longa'),
            offer: yup.boolean().optional().default(false),
            category_id: yup.string().required('Categoria é obrigatória'),
        });

        try {
            const validatedData = await productSchema.validate(req.body, { abortEarly: false });
            const { category_id } = validatedData;

           
            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ error: 'Categoria não encontrada' });
            }

            const product = await Product.create(validatedData);
            return res.status(201).json(product);
        } catch (e) {
            if (e instanceof yup.ValidationError) {
                return res.status(400).json({
                    errors: e.errors,
                });
            }

            return res.status(500).json({
                error: 'Erro interno do servidor',
                message: e.message,
            });
        }
    }

    async index(req, res) {
        try {
            const products = await Product.findAll({
                include: [{
                    model: Category,
                    as: 'category', 
                    attributes: ['id', 'name'],
                },
                {
                    model: FotoProducts, 
                    as: 'foto_products', 
                    attributes: ['id','url','filename'], 
                }
            ],
            });
            return res.json(products);
        } catch (e) {
            return res.status(500).json({
                error: 'Erro ao buscar produtos',
                message: e.message,
            });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id, {
                include: [{
                    model: Category,
                    as: 'category',
                    attributes: ['id', 'name'],
                },
                {
                    model: FotoProducts, 
                    as: 'foto_products', 
                    attributes: ['id','url','filename'], 
                }
            ],
            });

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            return res.json(product);
        } catch (e) {
            return res.status(500).json({
                error: 'Erro ao buscar produto',
                message: e.message,
            });
        }
    }

    async update(req, res) {
        const productSchema = yup.object().shape({
            name: yup.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
            price: yup.number().positive('Preço deve ser positivo'),
            description: yup.string().max(255, 'Descrição muito longa'),
            offer: yup.boolean(),
            category_id: yup.number(),
        });

        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            const validatedData = await productSchema.validate(req.body, { abortEarly: false });

            if (validatedData.category_id) {
                const category = await Category.findByPk(validatedData.category_id);
                if (!category) {
                    return res.status(404).json({ error: 'Categoria não encontrada' });
                }
            }

            await product.update(validatedData);
            return res.json(product);
        } catch (e) {
            if (e instanceof yup.ValidationError) {
                return res.status(400).json({
                    errors: e.errors,
                });
            }

            return res.status(500).json({
                error: 'Erro ao atualizar produto',
                message: e.message,
            });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findByPk(id);

            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await product.destroy();
            return res.status(204).send();
        } catch (e) {
            return res.status(500).json({
                error: 'Erro ao deletar produto',
                message: e.message,
            });
        }
    }
}

export default new ProductController();
