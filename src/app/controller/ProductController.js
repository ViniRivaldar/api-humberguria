import * as yup from 'yup'

import Product from '../models/Products.js'


class ProductController{
    async store(req,res){
        const productSchema = yup.object().shape({
            name: yup.string().required('Nome do produto é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
            price: yup.number().required('Preço é obrigatório').positive('Preço deve ser positivo'),
            description: yup.string().optional().max(255, 'Descrição muito longa'),
            offer: yup.boolean().optional().default(false)
        });

        try{
            const validatedData = await productSchema.validate(req.body, { abortEarly: false });
            const product = await Product.create(validatedData);
            return res.status(201).json(product);
        }catch(e){
            if (e instanceof yup.ValidationError) {
                return res.status(400).json({
                    errors: e.errors
                });
            }

            return res.status(500).json({
                error: 'Erro interno do servidor',
                message: e.message
            });
        }

          
    }
    index(req,res){
        res.send("olá mundo")
    }
    show(req,res){}
    update(req,res){}
    delete(req,res){}
}

export default new ProductController()