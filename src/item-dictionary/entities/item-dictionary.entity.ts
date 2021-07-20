import { CommonEntity } from "src/common/entity/common.entity";
import { InventoryItem } from "src/inventory/entities/inventory-item.entity";
import { Item } from "src/item/entities/item.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ItemDictionary extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 3
    })
    class: string;

    @Column({
        length: 3
    })
    subClass: string;

    @Column()
    no: number;

    @Column()
    maxStackSize: number;

    @Column({
        length: 20
    })
    name: string;

    @OneToMany(type => Item, items => items.dictionary)        
    items: Item[]

}
