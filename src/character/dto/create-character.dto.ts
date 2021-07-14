import { IsNumber, IsOptional, IsString, IsObject } from "class-validator";
import { User } from "src/user/entities/user.entity";

export class CreateCharacterDto {

    @IsString()
    readonly name: string;

    @IsObject()
    readonly user: User;
    
}
