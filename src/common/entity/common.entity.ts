import { Exclude } from "class-transformer";
import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class CommonEntity {

    @CreateDateColumn({
      name: "create_date",
      select: false
    })
    // @Column({ select: false })
    createDate: Date;

    @UpdateDateColumn({
      name: "update_date",
      select: false
    })
    // @Column({ select: false })
    updateDate: Date;
    
  }
  
 