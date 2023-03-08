import { Get, Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    @Get('/users')
    getUsers() {
        return [{ id: 1, name: 'Vlad' }]
    }
}