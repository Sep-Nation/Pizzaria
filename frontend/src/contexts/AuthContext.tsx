import { createContext, ReactNode, useState } from "react";

import { api } from "../services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies";
import Router from "next/router";

import { toast } from 'react-toastify'

type AuthContextData = {
  user: UserProps;
  isAuthenticated: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void;
  signUp: (credentials: SignUpProps) => void;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps = {
  email: string;
  password: string;
}

type SignUpProps = {
  name: string;
  email: string;
  password: string;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>()
  const isAuthenticated = !!user;

  async function signIn({ email, password}: SignInProps){
    try {
      const response = await api.post('/session', {
        email,
        password
      })

      const { id, name, token } = response.data;

      setCookie(undefined, '@nextauth.token', response.data.token, {
        maxAge: 60 * 60 * 24 * 30, // Exporar em 1 mes
        path: "/" , // Quais caminhos acessam o cookie
      })

      // Passar para proximas requisições o nosso token

      setUser({
        id,
        name,
        email,
      })

      // Passar para proximas reqisições o token
      api.defaults.headers['Autorization'] = `Bearer ${token}`

      // ALERTAR USUARIO
      toast.success('Logado com sucesso!')

      // Redireciona o user para a /dashboard
      Router.push('/dashboard')

    }   catch (err) {
      console.log('ERRO AO ACESSAR', err)
      toast.error('ERRO AO ACESSAR!')
    }
  }

  async function signUp({ name, email, password }: SignUpProps) {
    try {
      
      const response = await api.post('/users', {
        name,
        email,
        password
      })

      toast.success('Conta cadastrada com sucesso!')

      Router.push('/')

    } catch (error) {
      toast.error('Erro ao cadastrar!')
      console.log('Erro ao cadastrar: ', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}