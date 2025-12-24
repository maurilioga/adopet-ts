import AdotanteEntity from "../../entities/AdotanteEntity";
import EnderecoEntity from "../../entities/EnderecoEntity";

export default interface AdotanteRepositoryInterface {
    criarAdotante(adotante: AdotanteEntity): Promise<void> | void;
    listarAdotantes(): AdotanteEntity[] | Promise<AdotanteEntity[]>;
    atualizarAdotante(adotante: AdotanteEntity, id: number): Promise<{ success: boolean, message?: string}> | void;
    excluirAdotante(id: number): Promise<{ success: boolean, message?: string}> | void;
    atualizarEndereco(idAdotante: number, endereco: EnderecoEntity): Promise<{ success: boolean, message?: string}> | void;
}