import { IsAlpha, IsInt, IsPositive, IsString, Length } from "class-validator";
//import { isFloat32Array } from "util/types";

export class CreateRouteDto {
    @IsString()
    @Length(2,30,{groups:['create']}) 
        @Length(1,30,{groups:['update']}) 
    source: string;
    @IsString()
    @Length(2,10,{message:'error on length'})
    destination: string;
    @IsInt()
    @IsPositive({message:'Must be a positive num'})
    distance: number;
  }
  