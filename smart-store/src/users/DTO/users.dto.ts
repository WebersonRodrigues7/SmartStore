import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UserDTO {

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsStrongPassword()
    password!: string
}