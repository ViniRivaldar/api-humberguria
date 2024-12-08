import FotoProducts from "../models/FotoProducts.js";
import Product from "../models/Products.js";

class FotoProductController {
  async store(req, res) {
    try {
      const file = req.file;
      const { product_id } = req.body;  
      if (!file) {
        return res.status(400).json({ message: "Nenhuma imagem foi enviada." });
      }

      if (!product_id) {
        return res.status(400).json({ message: "ID do produto é obrigatório." });
      }

      
      const product = await Product.findByPk(product_id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado." });
      }

      const url = `https://res.cloudinary.com/dij2lqiy7/image/upload/v1733686091/${file.filename}`;

      
      const foto = await FotoProducts.create({
        originalmente: file.originalname,
        filename: file.filename,
        products_id: product_id,  
      });

      return res.status(200).json({
        message: "Imagem de produto salva com sucesso!",
        data: {
          id: foto.id, 
          originalmente: foto.originalmente,
          filename: foto.filename,
          url: url,  
          product_id: foto.products_id,  
        },
      });
    } catch (error) {
      console.error("Erro ao salvar imagem de produto:", error);
      return res.status(500).json({ message: "Erro ao salvar imagem de produto." });
    }
  }
}

export default new FotoProductController();