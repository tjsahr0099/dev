import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

export abstract class CommonEntity {

    @CreateDateColumn({
      name: "create_date"
    })
    createDate: Date;

    @UpdateDateColumn({
      name: "update_date"
    })
    updateDate: Date;
    
  }
  
 