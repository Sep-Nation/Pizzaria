import { prismaClient } from "../../prisma";
import { hash } from "bcryptjs";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute( {name, email, password}: UserRequest) {

    {/* VERIFICAÇÕES */}

    // Verificar se foi enviado email
    if(!email){
      throw new Error("Email incorrect")
    }

    // Verificar se o email já está cadastrado
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    })

    if(userAlreadyExists){
      throw new Error("User already exists")
    }
    {/* ------------------------------------- */}

    {/* CRIPTOGRAFIA DA SENHA */}

    const passwordHash = await hash(password, 8)

    {/* ------------------------------------- */}

    {/* CADASTRO DE USUARIO */}

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash // Criando hash da senha
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

export { CreateUserService }