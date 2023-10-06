import { FormEvent, useContext, useState } from "react"

import Head from "next/head"
import Image from "next/image"
import styles from '../../styles/home.module.scss'
import logoImg from '../../public/logo.svg'

import { Input } from "../components/ui/Input/index"
import { Button } from "../components/ui/Button"

import { AuthContext } from '../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from "next/link"

import { canSSRGuest } from "../utils/canSSRGuest"

export default function Home() {
  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    // Evitar que o user envie um dado vazio no email e senha
    if (email === '' || password === '') {
      toast.warn('Preencha todos os dados!')
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Lucas Restaurant - Faça seu login</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Lucas Pizzaria" />
        <div className={styles.login}>
          <form onSubmit={handleLogin}>
            <Input
              placeholder="Digite seu email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Digite sua senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>
          <Link legacyBehavior href="/signup"><a className={styles.text}> Não possui uma conta? Cadastre-se</a></Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  
  return {
    props: {}
  }
})