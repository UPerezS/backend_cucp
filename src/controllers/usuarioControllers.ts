import { Request, Response } from "express";
import validator from "validator";
import model from "../models/usuarioModelo";

class UsuarioController {

    public async list(req: Request, res: Response) {
        try {
            const usuarios = await model.list();
            return res.json({ message: "Listado de Usuarios:", code: 0, data: usuarios });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async add(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;
            if (validator.isEmpty(email.trim()) || validator.isEmpty(password.trim()) || validator.isEmpty(role.trim())) {
                return res.status(400).json({ message: "Todos los campos son requeridos", code: 1 });
            }
            await model.add({ email, password, role });
            return res.json({ message: "Usuario agregado exitosamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            await model.update({ email, password });
            return res.json({ message: "Usuario actualizado exitosamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { email } = req.body;
            if (validator.isEmpty(email.trim())) {
                return res.status(400).json({ message: "El email es requerido", code: 1 });
            }
            await model.delete(email);
            return res.json({ message: "Usuario eliminado exitosamente", code: 0 });
        } catch (error: any) {
            return res.status(500).json({ message: `${error.message}` });
        }
    }
}

export const usuarioController = new UsuarioController();
