import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne, Double} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";

@Entity()
export class Equipment extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;



}
