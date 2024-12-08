class FotoProductController {
    async store(req, res) {
      try {
        const file = req.file;
        return res.status(200).json({
          message: "Imagem de produto salva com sucesso!",
          url: file.path,
          id: file.filename,
        });
      } catch (error) {
        console.error("Erro ao salvar imagem de produto:", error);
        return res.status(500).json({ message: "Erro ao salvar imagem de produto." });
      }
    }
  }
  
  export default new FotoProductController();
  