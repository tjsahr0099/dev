import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCharacterDto {

    @IsString()
    readonly name: string;

    @IsNumber()
    readonly userId: number;
    
}
