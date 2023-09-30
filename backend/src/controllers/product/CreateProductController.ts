import { Request, Response } from "express";
import { CreateProductService } from "../../services/product/CreateProductService";

class CreateProductController{
  async handle(req: Request, res: Response){

    // Captura do body da requisição as informações que compõe o produto
    const {name, price, description, codebar, category_id} = req.body;

    // instancia o serviço de criar produto
    const createProductService = new CreateProductService();

    // verifica se tem arquivo pra enviar
    if(!req.file){
      throw new Error("error upload file")
    }else{

      // acessar caminho do file para importar na construção do produto
      const { originalname, filename: banner } = req.file;

      // Executa a criação do produto e preenchendo com as informações capturadas no body da request
      const product = await createProductService.execute({
        name,
        price,
        description,
        codebar,
        banner,
        category_id
      });

          // retorna ao usuario
    return res.json(product)
    }
  }
}

export { CreateProductController }