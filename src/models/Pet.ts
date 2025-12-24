import EspecieEnum from "../enums/EspecieEnum";

type Pet = {
    id: number;
    nome: string;
    especie: EspecieEnum;
    dataNascimento: Date;
    adotado: boolean;
}

export default Pet;