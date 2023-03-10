import { ExecutionContext, CanActivate, Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtSevice: JwtService) { }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        const client = context.switchToWs().getClient()
        try {
            const authHeader = req.headers ? req.headers.authorization : client.handshake.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException({ message: 'Wrong token' })
            }
            const user = this.jwtSevice.verify(token)
            req.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException({ message: 'User not authorized' })
        }
    }
}