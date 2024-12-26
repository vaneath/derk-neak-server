import { IsInt, IsPositive, Length } from "class-validator";

export class IdParamDto{
    @IsInt()
   
    @IsPositive()
    id:number;
}