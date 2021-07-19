import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, Double, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { Character } from "src/character/entities/character.entity";

@Entity()
export class Equipment extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;
    
    @Column()
    weaponId: string;

    @Column()    
    topId: string;

    @Column()
    bottomId: string;

    @Column()
    headId: string;

    @Column()
    shoesId: string;

    @Column()
    leftRingId: string;

    @Column()
    rightRingId: string;

    @Column()
    necklaceId: string;

    character: Character;

}
