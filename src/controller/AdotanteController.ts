import { Request, Response } from "express";
import AdotanteRepository from '../repositories/AdotanteRepository';
import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteController {
    
    constructor(private repository: AdotanteRepository){};

    async criarAdotante(req: Request, res: Response) {
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

            return res.status(201).json(adotante); 
        } catch(error) {
            console.error(error);
            return res.status(400).json({ mensagem: "Erro ao criar adotante!" })
        }
    }

    async listarAdotantes(req: Request, res: Response) {
        const listaAdotantes = await this.repository.listarAdotantes();

        return res.status(200).json(listaAdotantes);
    }

    async atualizarAdotante(req: Request, res: Response) {
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
            return res.status(400).json({ message });
        }
        
        return res.status(200).json(adotante);
    }

    async excluirAdotante(req: Request, res: Response) {
        const { id } = req.params;

        const { 
            success, 
            message 
        } = await this.repository.excluirAdotante(Number(id));

        if (!success) {
            return res.status(404).json({ message });
        }
        
        return res.sendStatus(204);
    }

    async atualizarEndereco(req: Request, res: Response) {
        const { idAdotante } = req.params;
        const { 
            cidade, 
            estado 
        } = req.body as EnderecoEntity;

        const endereco = new EnderecoEntity(cidade, estado);
        if(cidade) endereco.cidade = cidade;
        if(estado) endereco.estado = estado;

        const { 
            success, 
            message 
        } = await this.repository.atualizarEndereco(Number(idAdotante), endereco);

        if(!success) {
            return res.status(400).json({ message });
        }
        
        return res.status(200).json(endereco);
    }
}