import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateLocationDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    locationTitle: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    city: string;
  
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    country: string;
}
