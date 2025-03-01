import { Request, Response } from "express";
import Validator from "validator";
import model from "../models/authModelo";
import jwt from 'jsonwebtoken';
import { utils } from "../utils/utils";
import db from "../utils/database"
 
class AuthController {
   
    public async iniciarSesion(req: Request, res: Response) {
       
        try {
            const { email, password } = req.body;

            if (Validator.isEmpty(email.trim()) ||
                Validator.isEmpty(password.trim())) {
                return res
                    .status(400)
                    .json({ message: "Los campos son requeridos", code: 1 });
            }
            const lstUsers = await model.getuserByEmail(email);
            if (lstUsers.length <= 0) {
                return res.status(404).json({ message: "El usuario y/o contraseña es incorrecto", code: 1 });
            }
            let result = utils.checkPassword(password, lstUsers[0].password);
            result.then((value) => {
                if(value){
                    const newUser = {
                        email: lstUsers[0].email,
                        password: lstUsers[0].password,
                        role: lstUsers[0].role

                    }
                    console.log(process.env.SECRET);
                    const env = require('dotenv').config();
                    let token = jwt.sign(newUser, process.env.SECRET, {expiresIn: '1h'});
                    console.log(lstUsers[0].email, lstUsers[0].password);
                    return res.json({message: "Autenticación Successfull", token, code:0});
                }else{
                    return res.json({message: "Password Incorrecto.", code:1});
                }

            })


        } catch (error: any) {
            return 0;
        }

    }
 
}
export const authController = new AuthController();