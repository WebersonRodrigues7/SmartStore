import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class UserDTO {
    @IsEmail()
    @IsNotEmpty()
    name!: string

    @IsNotEmpty()
    @IsEmail()
    email!: string

    @IsNotEmpty()
    @IsStrongPassword()
    password!: string
}