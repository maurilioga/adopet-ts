import PetEntity from "../entities/PetEntity";

type PetRequestDTO = Omit<PetEntity, "id">;

type PetRequestParamsDTO = { id?: string, idAdotante?: string };

type PetResponseDTO = {
    data?: 
        | Pick<PetEntity, "id"|"nome"|"especie"|"porte">
        | Pick<PetEntity, "id"|"nome"|"especie"|"porte">[];
    error?: unknown;
};

export { PetRequestDTO, PetRequestParamsDTO, PetResponseDTO };