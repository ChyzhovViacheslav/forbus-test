import {HttpException, HttpStatus} from '@nestjs/common'

export class ValidationExeption extends HttpException {
    messages;

    constructor(res){
        super(res, HttpStatus.BAD_REQUEST)
        this.messages = res
    }
}