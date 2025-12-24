import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import PetRepositoryInterface from "./interfaces/PetRepositoryInterface";

export default class PetRepository implements PetRepositoryInterface {

    private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>) {
        this.repository = repository;
    }

    criarPet(pet: PetEntity): void {
        this.repository.save(pet);
    }

    async listarPet(): Promise<PetEntity[]> {
        return await this.repository.find();
    }

    async atualizarPet(newData: PetEntity, id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const pet = await this.repository.findOne({ where: { id } });

            if(!pet) return { success: false, message: "Pet não encontrado!" };

            Object.assign(pet, newData);

            await this.repository.save(pet);
            return { success: true, message: "Pet atualizado com sucesso!" };
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar pet!" };
        }
    }

    async excluirPet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const pet = await this.repository.findOne({ where: { id } });

            if(!pet) return { success: false, message: "Pet não encontrado!" };

            await this.repository.remove(pet);

            return { success: true };
        } catch(error) {
            console.log(error);
            return { success: false, message: "Erro ao excluir pet!" };
        }
    }

}