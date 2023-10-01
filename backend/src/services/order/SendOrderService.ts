import { prismaClient } from "../../prisma";

interface OrderRequest{
  order_id: string;
}

class SendOrderService{
  async execute({ order_id }: OrderRequest){

    // Captura o ID da ORDER e muda o status da DRAFT de TRUE para FALSE
    const order = await prismaClient.order.update({
      where:{
        id: order_id
      },
      data:{
        draft:false
      }
    })

    return order;

  }
}

export { SendOrderService }