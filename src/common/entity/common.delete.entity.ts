import { Exclude } from "class-transformer";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn} from "typeorm";

export abstract class CommonDeleteEntity {

    @CreateDateColumn({
        name: "create_date",
        select: false
    })
    createDate: Date;

    @UpdateDateColumn({
        name: "update_date",
        select: false
    })
    updateDate: Date;

    @DeleteDateColumn({
        name: "delete_date",
        select: false
    })
    deletedAt?: Date;
    
  }
  
 