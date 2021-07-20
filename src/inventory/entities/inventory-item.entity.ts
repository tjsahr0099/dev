import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryMaster } from "./inventory-master.entity";
import { ItemDictionary } from "src/item-dictionary/entities/item-dictionary.entity";
import { Item } from "src/item/entities/item.entity";

@Entity()
export class InventoryItem extends CommonEntity{

    @PrimaryColumn()
    @Column({
        select: false,
        length: 36
     })
    inventoryId: string;

    @PrimaryColumn()
    x: number;

    @PrimaryColumn()
    y: number;

    @Column()
    cnt: number;

    @ManyToOne(type => InventoryMaster, inventory => inventory.id)
    inventory: InventoryMaster;

    @ManyToOne(type => Item, item => item.inventoryItems)
    item: Item;
}
