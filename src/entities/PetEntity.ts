import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EspecieEnum from "../enums/EspecieEnum";
import AdotanteEntity from "./AdotanteEntity";
import PorteEnum from "../enums/PorteEnum";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    especie: EspecieEnum;

    @Column({nullable: true})
    porte?: PorteEnum;

    @Column()
    dataNascimento: Date;

    @Column()
    adotado: boolean;

    @ManyToOne(() => AdotanteEntity,(adotante) => adotante.pets)
    adotante!: AdotanteEntity;

    constructor(
        nome: string, 
        especie: EspecieEnum, 
        dataNascimento: Date, 
        adotado: boolean, 
        porte?: PorteEnum
    ) {
        this.nome = nome;
        this.especie = especie;
        this.dataNascimento = dataNascimento;
        this.adotado = adotado;
        this.porte = porte;
    }
}