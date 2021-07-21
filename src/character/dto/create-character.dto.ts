import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, IsObject } from "class-validator";
import { CreateEquipmentDto } from "src/equipment/dto/create-equipment.dto"; 
import { CreateInventoryMasterDto } from "src/inventory/dto/create-inventory-master.dto";
import { CreateInventoryDto } from "src/inventory/dto/create-inventory.dto";
import { CreateStatusDto } from "src/status/dto/create-status.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateCharacterDto {

    @IsString()
    @ApiProperty({ description: '이름' })
    readonly name?: string;

    @IsObject()
    @ApiProperty({ description: '유저' })
    readonly user: CreateUserDto;

    // @ApiProperty({ description: '장비' })
    equipment?: CreateEquipmentDto;

    @ApiProperty({ description: '스텟' })
    status?: CreateStatusDto;

    @ApiProperty({ description: '인벤토리' })
    inventory?: CreateInventoryMasterDto;
    
    
}
