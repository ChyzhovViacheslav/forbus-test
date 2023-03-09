import { Module, forwardRef } from "@nestjs/common";
import { AuthModule } from "src/auth/auth.module";
import { RedisModule } from "src/redis/redis.module";
import { GatewayService } from "./gateway.service";

@Module({
    providers: [GatewayService],
    imports: [
        forwardRef(() => AuthModule),
        forwardRef(() => RedisModule),
    ]
})
export class GatewayModule { }