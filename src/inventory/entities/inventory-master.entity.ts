import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryItem } from "./inventory-item.entity";

@Entity()
export class InventoryMaster extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToMany(type => InventoryItem, items => items.inventoryId)        
    @JoinColumn({ name: 'inventoryId' })
    items: InventoryItem[]

}
