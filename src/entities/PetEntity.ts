import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EspecieEnum from "../enums/EspecieEnum";

@Entity()
export default class PetEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    especie: EspecieEnum;

    @Column()
    dataNascimento: Date;

    @Column()
    adotado: boolean;
}