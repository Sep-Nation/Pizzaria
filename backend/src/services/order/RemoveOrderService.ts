import { prismaClient } from "../../prisma";

interface OrderRequest{
  order_id: string;
}

class RemoveOrderService{
  async execute({order_id}: OrderRequest){

    // procura no banco de dados um id correspondente e deleta
    const order = await prismaClient.order.delete({
      where:{
        id: order_id
      }
    })
    return order;
  }
}

export { RemoveOrderService }