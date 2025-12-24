import { Repository } from "typeorm";
import PetEntity from "../entities/PetEntity";
import PetRepositoryInterface from "./interfaces/PetRepositoryInterface";
import AdotanteEntity from "../entities/AdotanteEntity";

export default class PetRepository implements PetRepositoryInterface {
    private petRepository: Repository<PetEntity>;
    private adotanteRepository: Repository<AdotanteEntity>;    

    constructor(repository: Repository<PetEntity>, adotanteRepository: Repository<AdotanteEntity>) {
        this.petRepository = repository;
        this.adotanteRepository = adotanteRepository;
    }

    criarPet(pet: PetEntity): void {
        this.petRepository.save(pet);
    }

    async listarPet(): Promise<PetEntity[]> {
        return await this.petRepository.find();
    }

    async atualizarPet(newData: PetEntity, id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const pet = await this.petRepository.findOne({ where: { id } });

            if(!pet) return { success: false, message: "Pet não encontrado!" };

            Object.assign(pet, newData);

            await this.petRepository.save(pet);
            return { success: true, message: "Pet atualizado com sucesso!" };
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao atualizar pet!" };
        }
    }

    async excluirPet(id: number): Promise<{ success: boolean; message?: string }> {
        try {
            const pet = await this.petRepository.findOne({ where: { id } });

            if(!pet) return { success: false, message: "Pet não encontrado!" };

            await this.petRepository.remove(pet);

            return { success: true };
        } catch(error) {
            console.log(error);
            return { success: false, message: "Erro ao excluir pet!" };
        }
    }

    async adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string; }> {
        try {
            const pet = await this.petRepository.findOne({ where: { id: idPet } });

            if(!pet) return { success: false, message: "Pet não encontrato! "}

            const adotante = await this.adotanteRepository.findOne({ where: { id: idAdotante } });

            if(!adotante) return { success: false, message: "Adotante não encontrato! "}

            pet.adotado = true;
            pet.adotante = adotante;
            await this.petRepository.save(pet);

            return { success: true }
        } catch(error) {
            console.error(error);
            return { success: false, message: "Erro ao adotar pet!" };
        }
        
    }

}