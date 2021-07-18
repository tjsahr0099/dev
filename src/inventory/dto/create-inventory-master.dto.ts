import { IsNumber, IsString } from "class-validator";

export class CreateInventoryMasterDto {
  
    //인벤토리 마스터 아이디
    @IsString()
    id?: string;

}
