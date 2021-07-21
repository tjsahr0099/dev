import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateInventoryMasterDto {
  
    @IsString()
    @ApiProperty({ description: '인벤토리아이디' })
    id?: string;

}
