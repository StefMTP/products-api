import { Equals, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(20)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/((?=.*\d)|(?=.*\W+))/, {message: 'Password must contain one number or special character.'})
    @Matches(/(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must contain at least one uppercase and one lowercase letter.'})
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(16)
    password_confirmation: string
}