import { prismaClient } from "../../prisma";

class ListOrderService{
  async execute(){

    // Mostra todas as ORDERS onde o DRAFT e o STATUS forem FALSE e organiza em ordem crescente
    const orders = await prismaClient.order.findMany({
      where:{
        draft: false,
        status: false,
      },
      orderBy:{
        created_at: 'desc'
      }
    })
    return orders;
  }
}

export { ListOrderService }