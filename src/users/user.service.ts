import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.schema";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async registerUser(createUserDto: CreateUserDto) {
        const user = await this.userModel.create(createUserDto)
        return user
    }

    async getAllUsers(){
        const users =  await this.userModel.find()
        return users;
    }

    async getUserByEmail(email: string){
        const user = await this.userModel.findOne({email: email})
        return user
    }
}