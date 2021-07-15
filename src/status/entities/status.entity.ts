import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { Character } from "src/character/entities/character.entity";

@Entity()
export class Status extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({      
        default: 0 
    })
    atk: number;

    @Column({      
        default: 0 
    })
    def: number;

    @Column({      
        default: 0 
    })
    life: number;

    character: Character;

}
