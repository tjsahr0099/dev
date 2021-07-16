import { IsNumber, IsString } from "class-validator";

export class CreateInventoryDto {

    @IsString()
    inventoryId: string;
    
    @IsString()
    itemId: string;

    @IsNumber()
    cnt: number;

    @IsNumber()
    x: number;

    @IsNumber()
    y: number;

}
