import { IsNumber, IsObject, IsString } from "class-validator";
import { CreateItemDictionaryDto } from "src/item-dictionary/dto/create-item-dictionary.dto";
import { CreateItemDto } from "src/item/dto/create-item.dto";

export class CreateInventoryDto {

    //캐릭터 아이디
    @IsString()
    characterId?: string;

    //인벤토리 마스터 아이디
    @IsString()
    inventoryId?: string;

    @IsString()
    dictionaryId: string;
    
    @IsNumber()
    cnt?: number;
    
    x?: number;
    
    y?: number;

    item : CreateItemDto;

}
