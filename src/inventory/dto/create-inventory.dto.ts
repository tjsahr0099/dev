import { IsNumber, IsString } from "class-validator";

export class CreateInventoryDto {

    //캐릭터 아이디
    @IsString()
    characterId?: string;

    //인벤토리 마스터 아이디
    @IsString()
    inventoryId?: string;
    
    @IsString()
    itemId?: string;

    @IsNumber()
    cnt?: number;

    
    x?: number;

    
    y?: number;

}
