import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsOptional, IsString, notContains } from "class-validator";
import { CLASS, MAX_STACK_SIZE, SUB_CLASS } from "src/common/enum/common.enum";

export class CreateItemDictionaryDto {
    
    @IsString()
    @IsOptional()
    @ApiProperty({ description: '아이템사전아이디' })
    id?: string;

    @IsEnum(CLASS)
    @ApiProperty({ description: '분류' })
    class: string;

    @IsEnum(SUB_CLASS)
    @ApiProperty({ description: '서브분류' })
    subClass?: string;

    @IsNumber() //자동생성
    @IsOptional()
    @ApiProperty({ description: '번호' })
    no: number;

    @IsEnum(MAX_STACK_SIZE)
    @ApiProperty({ description: '최대스택크기' })
    maxStackSize: number;

    @IsString()
    @ApiProperty({ description: '이름' })
    name: string;


}
