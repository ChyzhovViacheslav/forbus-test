import { OnModuleInit, UseGuards } from "@nestjs/common";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection } from "@nestjs/websockets";
import { ConnectedSocket } from "@nestjs/websockets/decorators";
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@WebSocketGateway()
export class GatewayController implements OnGatewayConnection {
    @WebSocketServer()
    server: Server;

    handleConnection(client: any, ...args: any[]){
        client.emit('welcome', `Successful Connection, please type 'give five'`)
    }

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any, client: any) {
        this.server.emit('onMessage', {
            response: body === 'give five' ? 'okay, shut up and take my money' : `please type 'give five'`
        })
    }
}