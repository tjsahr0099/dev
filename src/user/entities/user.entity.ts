import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { Character } from "src/character/entities/character.entity";

@Entity()
export class User extends CommonEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20
    })
    name: string;

    @Column({
        length: 20
    })
    email: string; 

    @OneToMany(type => Character, character => character.user)
    characters: Character[]

}
