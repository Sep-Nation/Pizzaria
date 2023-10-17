import { canSSRAuth } from "@/src/utils/canSSRAuth"
import Head from "next/head"
import styles from './styles.module.scss'

import { Header } from "@/src/components/Header"
import { FiRefreshCcw } from "react-icons/fi"

import { setupAPIClient } from "@/src/services/api"
import { useState } from "react"

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps {
  orders: OrderProps[];
}

export default function Dashboard({ orders }: HomeProps) {

  const [orderList, setOrderList] = useState(orders || [])

  function handleOpenModalView(id: string){
    alert("ID: " + id)
  }

  return (
    <>
      <Head>
        <title>Painel - SEP Restaurant</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>

          <div className={styles.containerHeader}>
            <h1>Últimos pedidos</h1>
            <button>
              <FiRefreshCcw size={25} color="#3fffa3" />
            </button>
          </div>

          <article className={styles.listOrders}>

            {orderList.map(item => (
              <section key={item.id} className={styles.orderItem}>
                <button onClick={ () => handleOpenModalView(item.id)}>
                  <div className={styles.tag}></div>
                  <span>Mesa {item.table}</span>
                </button>
              </section>
            ))}

          </article>
        </main>

      </div>
    </>
  )
}
export const getServerSideProps = canSSRAuth(async (ctx) => {

  const apiClient = setupAPIClient(ctx);

  const response = await apiClient.get('/orders')

  return {
    props: {
      orders: response.data
    }
  }
})