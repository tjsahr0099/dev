import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { User } from "src/user/entities/user.entity";

@Entity()
export class Character extends CommonEntity  {

    @PrimaryGeneratedColumn()
    id: number;

    // @Column({
    //     name: "user_id"
    // })
    // userId: number;

    @Column({
        length: 20
    })
    name: string;
 
    @ManyToOne(type => User, user => user.characters)
    user: User
}
