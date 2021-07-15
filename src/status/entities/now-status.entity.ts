import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToOne, JoinColumn} from "typeorm";
import { CommonEntity } from "src/common/entity/common.entity";
import { Status } from "src/status/entities/status.entity";

@Entity()
export class NowStatus extends CommonEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({       
        default: 0
    })
    exp: number;

    @Column({       
        default: 0
    })
    life: number;

    @Column({       
        length: 1,
        default: 'N'
    })
    state: String;

    status: Status;

}
