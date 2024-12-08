import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../services/cloudinaryConfig.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folderName;

   
    if (req.baseUrl.includes("foto_product")) {
      folderName = "hamburgueria/products";
    } else if (req.baseUrl.includes("fotocategory")) {
      folderName = "hamburgueria/category";
    } else {
      folderName = "hamburgueria";
    }

    return {
      folder: folderName,
      allowed_formats: ["jpg", "jpeg", "png"], 
    };
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("O arquivo precisa ser uma imagem JPG ou PNG"));
    }
    return cb(null, true);
  },
});

export default upload;
