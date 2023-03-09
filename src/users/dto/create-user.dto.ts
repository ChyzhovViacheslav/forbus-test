import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'simplemail@gmail.com', description: 'Email'})
    @IsString({message: 'Requiered string'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @IsString({message: 'Requiered string'})
    @ApiProperty({example: 'John Doe', description: 'Username'})
    readonly username: string;

    @IsString({message: 'Requiered string'})
    @ApiProperty({example: 'wasd1234', description: 'Password'})
    @Length(8, 16, {message: 'Password must be at least 8 letters and not more than 16'})
    readonly password: string;
}