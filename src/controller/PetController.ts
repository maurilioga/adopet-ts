import { Request, Response } from "express";

let listaPets = [];

export default class PetController {
    criarPet(req: Request, res: Response) {
        const novoPet = req.body;
        listaPets.push(novoPet);

        return res.status(201).json(novoPet);
    }
}