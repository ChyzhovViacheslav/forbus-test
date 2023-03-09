import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { GatewayController } from "./gateway.service";

@Module({
    providers: [GatewayController],
    imports: [
        forwardRef(() => AuthModule)
    ]
})
export class GatewayModule { }