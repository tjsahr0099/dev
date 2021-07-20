import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryItem } from "src/inventory/entities/inventory-item.entity";
import { ItemDictionary } from "src/item-dictionary/entities/item-dictionary.entity";
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Item extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => ItemDictionary, dictionary => dictionary.items)
    dictionary: ItemDictionary;

    @OneToMany(type => InventoryItem, inventoryItems => inventoryItems.item)        
    inventoryItems: InventoryItem[]


}
