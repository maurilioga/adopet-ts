import { Repository } from "typeorm";
import AdotanteEntity from "../entities/AdotanteEntity";
import AdotanteRepositoryInterface from "./interfaces/AdotanteRepositoryInterface";
import EnderecoEntity from "../entities/EnderecoEntity";

export default class AdotanteRepository implements AdotanteRepositoryInterface {

    private repository: Repository<AdotanteEntity>;

    constructor(repository: Repository<AdotanteEntity>) {
        this.repository = repository;
    }

    async criarAdotante(adotante: AdotanteEntity): Promise<void> {
        await this.repository.save(adotante);
    }
    
    async listarAdotantes(): Promise<AdotanteEntity[]> {
        return await this.repository.find();
    }

    async atualizarAdotante(newData: AdotanteEntity, id: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const adotante = await this.repository.findOne({ where: { id } });

            if(!adotante) return { success: false, message: "Adotante não encontrado!" };

            Object.assign(adotante, newData);

            await this.repository.save(adotante);

            return { success: true };
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar adotante!" };
        }
    }
    
    async excluirAdotante(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const adotante = await this.repository.findOne({ where: { id } });

            if(!adotante) return { success: false, message: "Adotante não encontrado!" };

            await this.repository.remove(adotante);

            return { success: true };
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao excluir adotante!" };
        }
    }

    async atualizarEndereco(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean; message?: string; }> {
        try {
            const adotante = await this.repository.findOne({ where: { id: idAdotante } });

            if(!adotante) return { success: false, message: "Adotante não encontrado!" };

            const novoEndereco = new EnderecoEntity(endereco.cidade, endereco.estado);

            adotante.endereco = novoEndereco;

            await this.repository.save(adotante);

            return { success: true };
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar adotante!" };
        }
    }
}