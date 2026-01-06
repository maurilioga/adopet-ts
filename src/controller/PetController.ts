import { Request, Response } from "express";
import EspecieEnum from "../enums/EspecieEnum";
import PetRepository from "../repositories/PetRepository";
import PetEntity from "../entities/PetEntity";
import PorteEnum from "../enums/PorteEnum";
import { PetRequestDTO, PetRequestParamsDTO, PetResponseDTO } from "../dto/PetDTO";

export default class PetController {

    constructor(private repository: PetRepository){}

    criarPet(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const { 
            nome, 
            especie, 
            porte, 
            dataNascimento, 
            adotado 
        } = req.body as PetEntity;

        if(!Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ error: "Espécie informada não é válida! "})
        }

        if(porte && !(porte in PorteEnum)) {
            return res.status(400).json({ error: "Porte informado não é válido! "})
        }

        const novoPet = new PetEntity(
            nome, 
            especie, 
            dataNascimento, 
            adotado, 
            porte
        );
        novoPet.nome = nome;
        novoPet.especie = especie;
        novoPet.dataNascimento = dataNascimento;
        novoPet.adotado = adotado;
        novoPet.porte = porte;

        this.repository.criarPet(novoPet);

        return res.status(201).json({ data: { id:novoPet.id, nome, especie, porte }});
    }

    async listarPets(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const listaPets = await this.repository.listarPet();
        const data = listaPets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte
            }
        });

        return res.status(200).json({ data })
    }

    async atualizarPet(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const { id } = req.params;
        const { 
            nome, 
            especie, 
            porte, 
            dataNascimento, 
            adotado 
        } = req.body as PetEntity;

        if(especie && !Object.values(EspecieEnum).includes(especie)) {
            return res.status(400).json({ error: "Espécie informada não é válida! "})
        }

        const pet = new PetEntity(
            nome, 
            especie, 
            dataNascimento, 
            adotado, 
            porte
        );
        if(nome) pet.nome = nome;
        if(especie) pet.especie = especie;
        if(dataNascimento) pet.dataNascimento = dataNascimento;
        if(adotado) pet.adotado = adotado;
        if(porte) pet.porte = porte;

        const { 
            success, 
            message 
        } = await this.repository.atualizarPet(pet, Number(id));

        if(!success) {
            return res.status(400).json({ error: message });
        }
        
        return res.status(200).json({ data: { id: pet.id, nome: pet.nome, especie: pet.especie, porte: pet.porte } });
    }

    async excluirPet(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const { id } = req.params;

        const { 
            success, 
            message 
        } = await this.repository.excluirPet(Number(id));

        if (!success) {
            return res.status(404).json({ error: message });
        }
        return res.sendStatus(204);
    }

    async adotaPet(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const { 
            id, 
            idAdotante 
        } = req.params;

        const { 
            success, 
            message 
        } = await this.repository.adotaPet(
            Number(id),
            Number(idAdotante)
        );

        if(!success) return res.status(400).json({ error: message });

        return res.sendStatus(204);
    }

    // async buscarPetPorPorte(req: Request, res: Response) {
    //     const { porte } = req.query;

    //     const listaPets = await this.repository.buscarPetPorPorte(porte as PorteEnum);

    //     return res.status(200).json(listaPets);
    // }

    async buscarPetPorFiltro(req: Request<PetRequestParamsDTO, {}, PetRequestDTO>, res: Response<PetResponseDTO>) {
        const { 
            campo, 
            valor 
        } = req.query;

        const listaPets = await this.repository.buscarPetPorFiltro(
            campo as keyof PetEntity, 
            valor as string
        );

        const data = listaPets.map((pet) => {
            return {
                id: pet.id,
                nome: pet.nome,
                especie: pet.especie,
                porte: pet.porte
            }
        });

        return res.status(200).json({ data })
    }
}