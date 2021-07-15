import { IsObject } from "class-validator";
import { CreateCharacterDto } from "src/character/dto/create-character.dto";
import { CreateNowStatusDto } from "./create-now-status.dto";

export class CreateStatusDto {

    nowstatus?: CreateNowStatusDto;
}
