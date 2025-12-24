import { Request, Response } from "express";
import type Pet from "../models/Pet";
import EspecieEnum from "../enums/EspecieEnum";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";

export default class PetController {

    constructor(private repository: PetRepository){}

    criarPet(req: Request, res: Response) {
        const { nome, especie, dataNascimento, adotado } = req.body as PetEntity;

        if(!Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ erro: "Espécie informada não é válida! "})
        }

        const novoPet = new PetEntity();
        novoPet.nome = nome;
        novoPet.especie = especie;
        novoPet.dataNascimento = dataNascimento;
        novoPet.adotado = adotado;

        this.repository.criarPet(novoPet);

        return res.status(201).json(novoPet);
    }

    async listarPets(req: Request, res: Response) {
        const listaPets = await this.repository.listarPet();
        return res.status(200).json(listaPets)
    }

    async atualizarPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, dataNascimento, adotado } = req.body as PetEntity;

        if(especie && !Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ erro: "Espécie informada não é válida! "})
        }

        const pet = new PetEntity();
        if(nome) pet.nome = nome;
        if(especie) pet.especie = especie;
        if(dataNascimento) pet.dataNascimento = dataNascimento;
        if(adotado) pet.adotado = adotado;

        const { success, message } = await this.repository.atualizarPet(pet, Number(id));

        if(!success) {
            return res.status(400).json({ message });
        }
        
        return res.status(200).json(pet);
    }

    async excluirPet(req: Request, res: Response) {
        const { id } = req.params;

        const { success, message } = await this.repository.excluirPet(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }
        return res.sendStatus(204);
    }
}