import { IsNumber, IsOptional, IsString, IsObject } from "class-validator";
import { Equipment } from "src/equipment/entities/equipment.entity";
import { Status } from "src/status/entities/status.entity";
import { User } from "src/user/entities/user.entity";

export class CreateCharacterDto {

    @IsString()
    readonly name: string;

    @IsObject()
    readonly user: User;

    @IsObject()
    readonly equipment: Equipment;

    @IsObject()
    readonly status: Status;
    
}
