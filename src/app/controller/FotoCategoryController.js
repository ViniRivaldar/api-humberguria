import FotoCategory from '../models/FotoCategory.js'
import Category from '../models/Category.js' 

class FotoCategoryController{
    async store(req,res){
        try{
            const file = req.file;
            const { category_id } = req.body; 

            if (!file) {
                return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
            }

            if (!category_id) {
                return res.status(400).json({ message: "ID da categoria é obrigatório." });
            }

            const category = await Category.findByPk(category_id);
            if (!category) {
                return res.status(404).json({ message: "Categoria  não encontrado." });
            }

            const url = `https://res.cloudinary.com/dij2lqiy7/image/upload/v1733686091/${file.filename}`

            const foto = await FotoCategory.create({
                originalmente: file.originalname,
                filename: file.filename,
                category_id: category_id,  
            });

            return res.status(200).json({
                message: "Imagem de categoria salva com sucesso!",
                data: {
                  id: foto.id, 
                  originalmente: foto.originalmente,
                  filename: foto.filename,
                  url: url,  
                  category_id: foto.category_id, 
                },
            });

        }catch(e){
            console.error("Erro ao salvar imagem de produto:", e);
            return res.status(500).json({ message: "Erro ao salvar imagem de categoria." });
        }
    }
}

export default new FotoCategoryController()