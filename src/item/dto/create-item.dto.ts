import { IsString } from "class-validator";

export class CreateItemDto {

    @IsString()
    id?: string;

}
