import { UseGuards } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayConnection, ConnectedSocket } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RedisService } from "src/redis/redis.service";

@WebSocketGateway()
export class GatewayService implements OnGatewayConnection {
    constructor(
        private readonly redisService: RedisService,
        private readonly jwtService: JwtService
    ) { }

    @WebSocketServer()
    server: Server;

    async handleConnection(socket: Socket) {
        try {
            const token = socket.handshake.headers.authorization.split(' ')[1];
            const user = await this.jwtService.verify(token);
            socket.data.userId = user._id;
            await this.redisService.storeOperation(user._id, {
                time: new Date().toISOString(),
                operations: 'User connected'
            })
        } catch (error) {
            socket.disconnect();
        }
    }

    @UseGuards(JwtAuthGuard)
    @SubscribeMessage('onMessage')
    async onNewMessage(@MessageBody() body: string, @ConnectedSocket() client: Socket) {
        let response: any
        const userId = client.data.userId;
        const operation = await this.redisService.getOperations(userId)
        switch (body) {
            case 'give history': response = operation;
            break;
            case 'give five': response = 'okay, shut up and take my money';
            break;
            default: response = `please, type 'give five' or 'give history'`
        }
        this.server.emit('onMessage', response)
    }
}