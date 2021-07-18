import { Exclude } from "class-transformer";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class CommonEntity {

    @CreateDateColumn({
      name: "create_date"
    })
    @Column({ select: false })
    createDate: Date;

    @UpdateDateColumn({
      name: "update_date"
    })
    @Column({ select: false })
    updateDate: Date;
    
  }
  
 