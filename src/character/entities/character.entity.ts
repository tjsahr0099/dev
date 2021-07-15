import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { User } from "src/user/entities/user.entity";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { Status } from "src/status/entities/status.entity";

@Entity()
export class Character extends CommonEntity  {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 20
    })
    name: string;
 
    //캐릭터N - 유저1 간 관계 생성
    @ManyToOne(type => User, user => user.characters)
    user: User

    @OneToOne(type => Equipment, equipment => equipment.character)    
    @JoinColumn()
    equipment: Equipment

    @OneToOne(type => Status, status => status.character)    
    @JoinColumn()
    status: Status
}
