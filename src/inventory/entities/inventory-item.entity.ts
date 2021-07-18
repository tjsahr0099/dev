import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryMaster } from "./inventory-master.entity";
import { Exclude } from "class-transformer";

@Entity()
export class InventoryItem extends CommonEntity{

    @PrimaryColumn()
    @Column({ select: false })
    inventoryId: string;

    @PrimaryColumn()
    x: number;

    @PrimaryColumn()
    y: number;

    @Column()
    itemId: string;

    @Column()
    cnt: number;

    @ManyToOne(type => InventoryMaster, inventory => inventory.items)
    inventory: InventoryMaster;
}
