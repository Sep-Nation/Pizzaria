import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response){
  
    // Captura o email e senha da requisição
    const {email, password} = req.body

    // inicializando o serviço de autenticação
    const authUserService = new AuthUserService();

    // Executando o metodo do serviço de autenticação
    {/* NAO ESQUECER O AWAIT PRA ESPERAR A RESPOSTA DA AUTENTICAÇÃO ANTES DE PROSSEGUIR */}
    const auth = await authUserService.execute({
      email,
      password
    })

    // retorna para o usuario
    return res.json(auth)
  }
}

export { AuthUserController }