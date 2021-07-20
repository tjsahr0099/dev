import { IsEnum, IsNumber, IsOptional, IsString, notContains } from "class-validator";
import { CLASS, MAX_STACK_SIZE, SUB_CLASS } from "src/common/enum/common.enum";

export class CreateItemDictionaryDto {
    
    @IsString()
    @IsOptional()
    id?: string;

    @IsEnum(CLASS)
    class: string;

    @IsEnum(SUB_CLASS)
    subClass?: string;

    @IsNumber() //자동생성
    @IsOptional()    
    no: number;

    @IsEnum(MAX_STACK_SIZE)
    maxStackSize: number;

    @IsString()
    name: string;


}
