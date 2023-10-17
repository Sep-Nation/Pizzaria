import { prismaClient } from "../../prisma";

interface CategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    if (name === '') {
      throw new Error('Name invalid')
    }

    {/* VERIFICAÇÕES */ }
    // Verificar se ja tem uma categoria cadastrada
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    })


    console.log(categoryAlreadyExists)

    // nega a criação caso seja repitida

    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }
    {/* -------------------------------------- */ }

    const category = await prismaClient.category.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true,
      }
    })

    return category;
  }
}

export { CreateCategoryService }