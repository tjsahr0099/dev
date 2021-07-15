import { IsNumber, IsOptional, IsString, IsObject } from "class-validator";
import { CreateEquipmentDto } from "src/equipment/dto/create-equipment.dto"; 
import { CreateStatusDto } from "src/status/dto/create-status.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCharacterDto {

    @IsString()
    readonly name?: string;

    @IsObject()
    readonly user: CreateUserDto;

    equipment?: CreateEquipmentDto;

    status?: CreateStatusDto;
    
    
}
