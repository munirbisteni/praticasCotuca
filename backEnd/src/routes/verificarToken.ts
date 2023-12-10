import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
const SECRET:any = process.env.SECRET;
export const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const tokenHeader = req.headers["authorization"];
    console.log(req.headers);
    const token = tokenHeader && tokenHeader.split(" ")[1];
    console.log(token)
    if(!token){
      return res.status(401).json({
          statusCode: 401,
          message: "Não Autorizado"
      })
    }
    try{
        jwt.verify(token, SECRET);
        next();
     }
      catch(error){
          console.error(error);
          res.status(500).json({
            statusCode: 500,
            message: "Token inválido."
      })
      }
  }


  