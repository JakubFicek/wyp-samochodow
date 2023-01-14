import { IsEmail, IsNotEmpty } from "class-validator";

export class logIn {
    @IsNotEmpty()  
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}