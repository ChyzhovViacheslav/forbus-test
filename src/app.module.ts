import {Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';

@Module({
    controllers: [AppController],
    providers: [AppService],
    imports: [MongooseModule.forRoot('')]
})

export class AppModule {

}