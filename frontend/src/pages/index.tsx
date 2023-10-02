import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'

import { Input } from "../components/ui/Input/index"
import { Button } from "../components/ui/Button"



export default function Home() {
  return (
    <>
      <Head>
        <title>Lucas Restaurant - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Lucas Pizzaria" />
        <div className={styles.login}>
          <form>
            <Input placeholder="Digite seu email" type="email"/>
            <Input placeholder="Digite sua senha" type="password"/>
            <Button 
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
          <a className={styles.text}> Não possui uma conta? Cadastre-se</a>
        </div>
      </div>
    </>
  )
}
