import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity('TBL_USER')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

}
