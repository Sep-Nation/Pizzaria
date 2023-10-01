import crypto from 'node:crypto';
import multer from 'multer';

import {extname, resolve} from 'node:path';

export default{
  // Recebe a pasta que quer salvar
  upload(folder: string){
    return{
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder),
        filename: (request, file, callback) =>{
          const fileHash = crypto.randomBytes(16).toString("hex");
          const fileName = `${fileHash}-${file.originalname}`

          return callback(null, fileName)
        }
      })
    }
  }
}