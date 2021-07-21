import { IsOptional, IsString } from "class-validator";

export class CreateItemDto {

    @IsString()
    id?: string;

    @IsString()
    @IsOptional()
    dictionaryId: string;

}
