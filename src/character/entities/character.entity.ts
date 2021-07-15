import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { User } from "src/user/entities/user.entity";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { Status } from "src/status/entities/status.entity";

@Entity()
export class Character extends CommonEntity  {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    // @Column({
    //     name: "user_id"
    // })
    // userId: number;

    @Column({
        length: 20
    })
    name: string;

    @Column({      
        default: 0 
    })
    level: number;

    @Column({       
        default: 0
    })
    exp: number;
 
    //캐릭터N - 유저1 간 관계 생성
    @ManyToOne(type => User, user => user.characters)
    user: User

    //케릭터1 - 장비1 간 관계 생성
    @OneToOne(type => Character, character => character.equipment)
    @JoinColumn()
    equipment: Equipment

    //케릭터1 - 장비1 간 관계 생성
    @OneToOne(type => Character, character => character.status)
    @JoinColumn()
    status: Status
}
