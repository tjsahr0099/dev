import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class Character {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "user_id"
    })
    userId: number;

    @Column({
        length: 20
    })
    name: string;
   
    @CreateDateColumn({
        name: "create_date"
    })
    createDate: Date;

}
