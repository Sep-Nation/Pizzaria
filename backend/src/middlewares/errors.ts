import express, {Request, Response, NextFunction}  from "express";
import 'express-async-errors'

// TODO: Transferir para a logica de controle de erros no arquivos server.ts

const errors = express();

errors.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error) {
    return res.status(400).json({
      error: err.message
    })
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  })

})

export {errors}