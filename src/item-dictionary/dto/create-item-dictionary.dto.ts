import { IsNumber, IsString } from "class-validator";

export class CreateItemDictionaryDto {
    
    @IsString()
    id?: string;

    @IsString()
    class: string;

    @IsString()
    subClass?: string;

    @IsNumber()
    no: number;

    @IsNumber()
    maxStackSize: number;

    @IsString()
    name: string;


}
