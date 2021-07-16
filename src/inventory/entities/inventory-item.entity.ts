import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryMaster } from "./inventory-master.entity";

@Entity()
export class InventoryItem extends CommonEntity{

    @PrimaryColumn()
    inventoryId: string;

    @PrimaryColumn()
    x: number;

    @PrimaryColumn()
    y: number;

    @Column()
    itemId: string;

    @Column()
    cnt: number;

    @ManyToOne(type => InventoryMaster, inventory => inventory.id)
    inventory: InventoryMaster;
}
