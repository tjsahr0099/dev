import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn} from "typeorm";

@Entity()
export class User {

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

    @CreateDateColumn({
        name: "create_date"
    })
    createDate: Date;

}
