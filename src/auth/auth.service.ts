import { Body, Injectable } from "@nestjs/common/decorators";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException, UnauthorizedException } from "@nestjs/common/exceptions";
import { JwtService } from "@nestjs/jwt/dist";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UserService } from "src/users/user.service";
import * as bcrypt from 'bcryptjs';
import { User } from "src/users/user.schema";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email)

        if (candidate) {
            return new HttpException('User with this email is allready exist', HttpStatus.BAD_REQUEST)
        }

        const hashPass = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.registerUser({...userDto, password: hashPass})
        return this.generateToken(user)
    }

    async update(userDto: CreateUserDto){
        const user = await this.userService.getUserByEmail(userDto.email)
        if(!user){
            return new HttpException('User not find', HttpStatus.BAD_REQUEST)
        }

        const newHashPass = await bcrypt.hash(userDto.password, 5);

        user.username = userDto.username || user.username,
        user.password = newHashPass || user.password,
        user.email = userDto.email || user.email,
        
        user.save()
        return user
    }

    async delete(userDto: CreateUserDto){
        
    }

    private async generateToken(user: User){
        const payload = {email: user.email, userid: user.userid}
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: CreateUserDto){
        const user = await this.userService.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(user && passwordEquals){
            return user;
        }
        throw new UnauthorizedException({message: 'Incorrect email or password'})
    }
}