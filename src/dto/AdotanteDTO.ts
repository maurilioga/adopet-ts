import AdotanteEntity from "../entities/AdotanteEntity";
import EnderecoEntity from "../entities/EnderecoEntity";

type AdotanteRequestDTO = Omit<AdotanteEntity, "id">;

type AdotanteRequestParamsDTO = { id?: string };

type AdotanteResponseDTO = {
    data?: 
        | Pick<AdotanteEntity, "id"|"nome">
        | Pick<AdotanteEntity, "id"|"nome">[];
    error?: unknown;
};

type AdotanteEnderecoResponseDTO = {
    data?: Pick<EnderecoEntity, "cidade"|"estado">;
    error?: unknown;
};

export { AdotanteRequestDTO, AdotanteRequestParamsDTO, AdotanteResponseDTO, AdotanteEnderecoResponseDTO };