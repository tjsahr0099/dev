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

    //유저1 - 캐릭터N 간 관계 생성
    @OneToMany(type => Character, character => character.user)
    characters: Character[]

}
