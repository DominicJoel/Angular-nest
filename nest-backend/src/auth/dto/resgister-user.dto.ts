import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterUserDto { // La idea de este DTO ES saber que data esperar
    
    @IsEmail()
    email:string;
    
    @IsString()
    name:string;
    @MinLength(6)
    password:string;
}
