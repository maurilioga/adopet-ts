import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import EnderecoEntity from "./EnderecoEntity";
import PetEntity from "./PetEntity";

@Entity()
export default class AdotanteEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column()
    senha: string;

    @Column({ nullable: true })
    celular?: string;

    @OneToOne(() => EnderecoEntity,{nullable: true, cascade: true, eager:true})
    @JoinColumn()
    endereco?: EnderecoEntity;

    @OneToMany(() => PetEntity,(pet) => pet.adotante)
    pets!: PetEntity[];

    constructor(nome: string, cpf: string, senha: string, celular?: string, endereco?: EnderecoEntity) {
        this.nome = nome;
        this.cpf = cpf;
        this.senha = senha;
        this.celular = celular;
        this.endereco = endereco;
    }
}