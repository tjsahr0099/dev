import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { Character } from "src/character/entities/character.entity";
import { NowStatus } from "src/status/entities/now-status.entity";

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

    @Column({      
        default: 0 
    })
    level: number;

    character: Character;
   
    @OneToOne(type => NowStatus, nowstatus => nowstatus.status)
    @JoinColumn()
    nowstatus: NowStatus;

}
