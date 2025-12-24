import PetEntity from "../../entities/PetEntity"

export default interface PetRepositoryInterface {
    criarPet(pet: PetEntity): void;
    listarPet(): PetEntity[] | Promise<PetEntity[]>;
    atualizarPet(pet: PetEntity, id: number): Promise<{ success: boolean; message?: string }> | void;
    excluirPet(id: number): Promise<{ success: boolean; message?: string }> | void;
    adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> | void;
}