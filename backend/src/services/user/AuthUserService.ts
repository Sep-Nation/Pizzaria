import { prismaClient } from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import { AuthInvalid } from "../../server";

interface AuthRequest{
  email: string;
  password: string;
}

class AuthUserService {
  async execute({email, password}: AuthRequest) {

    {/* VERIFICAÇÕES */}

    // verifica se tem um email
    const user = await prismaClient.user.findFirst({
      where:{
        email: email
      }
    })

    // caso o email esteja incorreto
    if(!user){
      throw new AuthInvalid()
    }

    // verifica se a senha esta correta com o email enviado
    const passwordMatch = await compare(password, user.password)

    // caso a senha nao coincida
    if(!passwordMatch){
      throw new AuthInvalid()
    }

    // se deu tudo certo gera um token para o usuário
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    // retorna as infos do usuario e o token gerado
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    }

  }
}

export { AuthUserService }