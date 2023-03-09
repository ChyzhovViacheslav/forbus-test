import { ApiProperty } from "@nestjs/swagger";
import { User } from "../user.schema";

export class CreateUserDto {
    @ApiProperty({example: 'simplemail@gmail.com', description: 'Email'})
    readonly email: string;

    @ApiProperty({example: 'John Doe', description: 'Username'})
    readonly username: string;

    @ApiProperty({example: 'wasd1234', description: 'Password'})
    readonly password: string;
}