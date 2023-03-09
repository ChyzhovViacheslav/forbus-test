import { Controller, Post, Get, Put, Delete, Body, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    registerUser(@Body() userDto: CreateUserDto) {
        return this.userService.registerUser(userDto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }
}