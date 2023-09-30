import { prismaClient } from "../../prisma";

interface ProductRequest{
  name: string;
  price: string;
  description: string;
  banner: string;
  codebar: string
  category_id: string;
}

class CreateProductService{
  async execute({name, price, description, codebar, banner, category_id}: ProductRequest){

    const product = await prismaClient.product.create({
      data:{
        name: name,
        price: price,
        description: description,
        codebar: codebar,
        banner: banner,
        category_id: category_id,
      }
    })
    return product;
  }
}

export { CreateProductService }