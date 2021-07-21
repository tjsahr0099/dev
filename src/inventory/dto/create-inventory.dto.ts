import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsObject, IsString } from "class-validator";
import { CreateItemDictionaryDto } from "src/item-dictionary/dto/create-item-dictionary.dto";
import { CreateItemDto } from "src/item/dto/create-item.dto";

export class CreateInventoryDto {

    @IsString()
    @ApiProperty({ description: '캐릭터아이디' })
    characterId?: string;

    @IsString()
    @ApiProperty({ description: '인벤토리아이디' })
    inventoryId?: string;

    // @IsString()
    // dictionaryId: string;
    
    @IsNumber()
    @ApiProperty({ description: '아이템갯수' })
    cnt?: number;
    
    @ApiProperty({ description: '인벤토리위치X' })
    x?: number;
    
    @ApiProperty({ description: '인벤토리위치Y' })
    y?: number;

    @ApiProperty({ description: '아이템' })
    item : CreateItemDto;

}
