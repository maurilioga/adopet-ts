import { Request, Response } from "express";
import AdotanteRepository from '../repositories/AdotanteRepository';
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";
import { AdotanteEnderecoResponseDTO, AdotanteRequestDTO, AdotanteRequestParamsDTO, AdotanteResponseDTO } from "../dto/AdotanteDTO";

export default class AdotanteController {
    
    constructor(private repository: AdotanteRepository){};

    async criarAdotante(req: Request<AdotanteRequestParamsDTO, {}, AdotanteRequestDTO>, res: Response<AdotanteResponseDTO>) {
        try {
            const { 
                nome, 
                cpf, 
                senha, 
                celular, 
                endereco 
            } = req.body as AdotanteEntity;

            const adotante = new AdotanteEntity(
                nome,
                cpf,
                senha,
                celular, 
                endereco
            )

            await this.repository.criarAdotante(adotante)

            return res.status(201).json({ data: { id: adotante.id, nome }}); 
        } catch(error) {
            console.error(error);
            return res.status(400).json({ error: "Erro ao criar adotante!" })
        }
    }

    async listarAdotantes(req: Request<AdotanteRequestParamsDTO, {}, AdotanteRequestDTO>, res: Response<AdotanteResponseDTO>) {
        const listaAdotantes = await this.repository.listarAdotantes();
        const data = listaAdotantes.map((adotante) => {
            return {
                id:adotante.id,
                nome:adotante.nome
            }
        });

        return res.status(200).json({ data });
    }

    async atualizarAdotante(req: Request<AdotanteRequestParamsDTO, {}, AdotanteRequestDTO>, res: Response<AdotanteResponseDTO>) {
        const { id } = req.params;
        const { 
            nome, 
            cpf, 
            senha, 
            celular, 
            endereco 
        } = req.body as AdotanteEntity;

        const adotante = new AdotanteEntity(nome, cpf, senha, celular, endereco);
        if(nome) adotante.nome = nome;
        if(cpf) adotante.cpf = cpf;
        if(senha) adotante.senha = senha;
        if(celular) adotante.celular = celular;
        if(endereco) adotante.endereco = endereco;

        const { 
            success, 
            message 
        } = await this.repository.atualizarAdotante(adotante, Number(id));

        if(!success) {
            return res.status(400).json({ error: message });
        }
        
        return res.status(200).json({ data: { id: adotante.id, nome: adotante.nome }});
    }

    async excluirAdotante(req: Request<AdotanteRequestParamsDTO, {}, AdotanteRequestDTO>, res: Response<AdotanteResponseDTO>) {
        const { id } = req.params;

        const { 
            success, 
            message 
        } = await this.repository.excluirAdotante(Number(id));

        if (!success) {
            return res.status(404).json({ error: message });
        }
        
        return res.sendStatus(204);
    }

    async atualizarEndereco(req: Request<AdotanteRequestParamsDTO, {}, AdotanteRequestDTO>, res: Response<AdotanteEnderecoResponseDTO>) {
        const { id } = req.params;
        const { 
            cidade, 
            estado 
        } = req.body.endereco as EnderecoEntity;

        const endereco = new EnderecoEntity(cidade, estado);
        if(cidade) endereco.cidade = cidade;
        if(estado) endereco.estado = estado;

        const { 
            success, 
            message 
        } = await this.repository.atualizarEndereco(Number(id), endereco);

        if(!success) {
            return res.status(400).json({ error: message });
        }
        
        return res.status(204).json({ data: endereco });
    }
}