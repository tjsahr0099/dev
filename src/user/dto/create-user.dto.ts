import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @ApiProperty({ description: '이름' })
    readonly name?: string;

    @IsString()
    @ApiProperty({ description: '이메일' })
    readonly email?: string;

    @IsString()
    @ApiProperty({ description: '유저아이디' })
    readonly id?: string;
    
}
