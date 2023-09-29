import { prismaClient } from "../../prisma"

class DetailUserService {
  async execute(user_id: string) {

    // Consulta no banco de dados e entrega o resultado do primeiro item que ele encontrar correspondente ao user_id fornecido
    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    })

    return user;
  }
}

export { DetailUserService }