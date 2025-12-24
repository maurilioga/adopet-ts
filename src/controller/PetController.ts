import { Request, Response } from "express";
import type Pet from "../models/Pet";
import EspecieEnum from "../enums/EspecieEnum";

let listaPets : Pet[] = [];
let id = 0;
function geraId(): number {
  id = id + 1;
  return id;
}

export default class PetController {
    criarPet(req: Request, res: Response) {
        const { nome, especie, dataNascimento, adotado } = req.body as Pet;

        if(!Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ erro: "Espécie informada não é válida! "})
        }

        const novoPet: Pet = { id: geraId(), nome, especie, dataNascimento, adotado };
        listaPets.push(novoPet);

        return res.status(201).json(novoPet);
    }

    listarPets(req: Request, res: Response) {
        return res.status(200).json(listaPets);
    }

    atualizarPet(req: Request, res: Response) {
        const { id } = req.params;
        const { nome, especie, dataNascimento, adotado } = req.body as Pet;

        if(!Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ erro: "Espécie informada não é válida! "})
        }

        const pet = listaPets.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({ erro: "O pet informado não existe!" });
        }

        if(nome) pet.nome = nome;
        if(especie) pet.especie = especie;
        if(dataNascimento) pet.dataNascimento = dataNascimento;
        if(adotado) pet.adotado = adotado;
        return res.status(200).json(pet);
    }

    excluirPet(req: Request, res: Response) {
        const { id } = req.params;
        const pet = listaPets.find((pet) => pet.id === Number(id));

        if(!pet) {
            return res.status(404).json({ erro: "O pet informado não existe!" });
        }

        const petIndex = listaPets.indexOf(pet);
        listaPets.splice(petIndex, 1);

        return res.status(204);
    }
}