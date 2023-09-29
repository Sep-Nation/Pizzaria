import { prismaClient } from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if(name === '') {
      throw new Error('Name invalid')
    }

    const category = await prismaClient.category.create({
      data:{
        name: name
      },
      select: {
        id: true,
        name: true,
      }
    })

    {/* VERIFICAÇÕES */}

    // Verificar se ja tem uma categoria cadastrada
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    })

    // nega a criação caso seja repitida
    
    if(categoryAlreadyExists){
      throw new Error('Category already exists')
    }
    {/* -------------------------------------- */}
    
    return category;
  }
}

export { CreateCategoryService }