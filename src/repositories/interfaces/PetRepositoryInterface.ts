import PetEntity from "../../entities/PetEntity"
import PorteEnum from "../../enums/PorteEnum";

export default interface PetRepositoryInterface {
    criarPet(pet: PetEntity): void;
    listarPet(): PetEntity[] | Promise<PetEntity[]>;
    atualizarPet(pet: PetEntity, id: number): Promise<{ success: boolean; message?: string }> | void;
    excluirPet(id: number): Promise<{ success: boolean; message?: string }> | void;
    adotaPet(idPet: number, idAdotante: number): Promise<{ success: boolean; message?: string }> | void;
    // buscarPetPorPorte(porte: PorteEnum): Promise<PetEntity[]> | PetEntity[];
    buscarPetPorFiltro<T extends keyof PetEntity>(campo: T, valor: PetEntity[T]): Promise<PetEntity[]> | PetEntity[];
}